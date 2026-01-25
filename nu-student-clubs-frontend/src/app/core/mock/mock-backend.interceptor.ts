import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MockDbService, MockUser } from './mock-db.service';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor(private mockDb: MockDbService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // If mock backend is disabled, pass through to real backend
    if (!environment.useMockBackend) {
      return next.handle(request);
    }

    // Extract path from URL - handle both full URLs and relative paths
    const url = request.url;
    
    // ============ AUTH ENDPOINTS ============
    if (url.includes('/auth/register') || url.includes('/auth/signup')) {
      return this.handleRegister(request);
    }

    if (url.includes('/auth/login')) {
      return this.handleLogin(request);
    }

    if (url.includes('/auth/me')) {
      return this.handleGetMe(request);
    }

    // ============ CLUBS ENDPOINTS ============
    if (url.includes('/clubs')) {
      return this.handleClubs(request);
    }

    // ============ EVENTS ENDPOINTS ============
    if (url.includes('/events')) {
      return this.handleEvents(request);
    }

    // ============ GALLERY ENDPOINTS ============
    if (url.includes('/gallery')) {
      return this.handleGallery(request);
    }

    // ============ ADMIN ENDPOINTS ============
    if (url.includes('/admins')) {
      return this.handleAdmins(request);
    }

    if (url.includes('/board-members')) {
      return this.handleBoardMembers(request);
    }

    if (url.includes('/committees')) {
      return this.handleCommittees(request);
    }

    // Pass through if no mock endpoint found
    return next.handle(request);
  }

  // ============ AUTH HANDLERS ============

  private handleRegister(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method !== 'POST') {
      return this.error(405, 'Method Not Allowed');
    }

    const body = request.body;

    // Validation
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return this.error(400, 'Missing required fields: email, password, firstName, lastName');
    }

    // Check NU email format
    if (!body.email.endsWith('@nu.edu.eg')) {
      return this.error(400, 'Email must be a NU email address (@nu.edu.eg)');
    }

    // Check if email already exists
    if (this.mockDb.getUserByEmail(body.email)) {
      return this.error(400, 'Email already registered');
    }

    // Create new user
    const newUser = this.mockDb.createUser({
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      role: 'STUDENT'
    });

    // Generate token
    const token = this.generateToken(newUser);

    const response = {
      token,
      user: this.userToResponse(newUser)
    };

    return of(new HttpResponse({ status: 201, body: response })).pipe(delay(500));
  }

  private handleLogin(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method !== 'POST') {
      return this.error(405, 'Method Not Allowed');
    }

    const body = request.body;

    if (!body.email || !body.password) {
      return this.error(400, 'Email and password are required');
    }

    // Find user by email
    const user = this.mockDb.getUserByEmail(body.email);

    if (!user || user.password !== body.password) {
      return this.error(401, 'Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user);

    const response = {
      token,
      user: this.userToResponse(user)
    };

    return of(new HttpResponse({ status: 200, body: response })).pipe(delay(500));
  }

  private handleGetMe(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return this.error(405, 'Method Not Allowed');
    }

    // Check auth
    const token = this.getTokenFromRequest(request);
    if (!token) {
      return this.error(401, 'Unauthorized - no token provided');
    }

    const userId = this.getUserIdFromToken(token);
    const user = this.mockDb.getUserById(userId);

    if (!user) {
      return this.error(401, 'Unauthorized - invalid token');
    }

    return of(new HttpResponse({ status: 200, body: this.userToResponse(user) })).pipe(delay(300));
  }

  // ============ CLUBS HANDLERS ============

  private handleClubs(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const url = request.url;
    const id = this.extractIdFromUrl(url, '/clubs/');

    if (request.method === 'GET') {
      if (id) {
        // GET /api/clubs/:id
        const club = this.mockDb.getClubById(id);
        if (!club) {
          return this.error(404, 'Club not found');
        }
        return of(new HttpResponse({ status: 200, body: club })).pipe(delay(300));
      } else {
        // GET /api/clubs
        const clubs = this.mockDb.getAllClubs();
        return of(new HttpResponse({ status: 200, body: clubs })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      // POST /api/clubs - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      const body = request.body;
      if (!body.name || !body.email) {
        return this.error(400, 'Missing required fields: name, email');
      }

      const newClub = this.mockDb.createClub({
        name: body.name,
        description: body.description,
        overview: body.overview,
        mission: body.mission,
        founders: body.founders,
        president: body.president || 'TBD',
        email: body.email,
        contactEmail: body.contactEmail,
        category: body.category || 'General',
        logo: body.logo,
        memberCount: 0,
        numberOfMembers: 0,
        isActive: body.isActive !== false
      });

      return of(new HttpResponse({ status: 201, body: newClub })).pipe(delay(500));
    }

    if (request.method === 'PUT' && id) {
      // PUT /api/clubs/:id - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      const club = this.mockDb.updateClub(id, request.body);
      if (!club) {
        return this.error(404, 'Club not found');
      }
      return of(new HttpResponse({ status: 200, body: club })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      // DELETE /api/clubs/:id - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      if (!this.mockDb.deleteClub(id)) {
        return this.error(404, 'Club not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ EVENTS HANDLERS ============

  private handleEvents(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const url = request.url;
    const id = this.extractIdFromUrl(url, '/events/');

    if (request.method === 'GET') {
      if (id) {
        // GET /api/events/:id
        const event = this.mockDb.getEventById(id);
        if (!event) {
          return this.error(404, 'Event not found');
        }
        return of(new HttpResponse({ status: 200, body: event })).pipe(delay(300));
      } else {
        // GET /api/events
        const events = this.mockDb.getAllEvents();
        return of(new HttpResponse({ status: 200, body: events })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      // POST /api/events - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      const body = request.body;
      if (!body.clubId || !body.title || !body.startDate || !body.endDate) {
        return this.error(400, 'Missing required fields: clubId, title, startDate, endDate');
      }

      const newEvent = this.mockDb.createEvent({
        clubId: body.clubId,
        title: body.title,
        description: body.description || '',
        startDate: body.startDate,
        endDate: body.endDate,
        location: body.location || 'TBD',
        capacity: body.capacity || 50,
        attendeeCount: 0,
        imageUrl: body.imageUrl || 'https://via.placeholder.com/300x200'
      });

      return of(new HttpResponse({ status: 201, body: newEvent })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      // DELETE /api/events/:id - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      if (!this.mockDb.deleteEvent(id)) {
        return this.error(404, 'Event not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ GALLERY HANDLERS ============

  private handleGallery(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const url = request.url;
    const id = this.extractIdFromUrl(url, '/gallery/');

    if (request.method === 'GET') {
      if (id) {
        // GET /api/gallery/:id
        const item = this.mockDb.getGalleryItemById(id);
        if (!item) {
          return this.error(404, 'Gallery item not found');
        }
        return of(new HttpResponse({ status: 200, body: item })).pipe(delay(300));
      } else {
        // GET /api/gallery
        const items = this.mockDb.getAllGallery();
        return of(new HttpResponse({ status: 200, body: items })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      // POST /api/gallery - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      const body = request.body;
      if (!body.clubId || !body.imageUrl || !body.title) {
        return this.error(400, 'Missing required fields: clubId, imageUrl, title');
      }

      const newItem = this.mockDb.createGalleryItem({
        clubId: body.clubId,
        imageUrl: body.imageUrl,
        title: body.title,
        description: body.description || ''
      });

      return of(new HttpResponse({ status: 201, body: newItem })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      // DELETE /api/gallery/:id - admin only
      if (!this.isAdmin(request)) {
        return this.error(403, 'Forbidden - admin access required');
      }

      if (!this.mockDb.deleteGalleryItem(id)) {
        return this.error(404, 'Gallery item not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ ADMINS HANDLERS ============

  private handleAdmins(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (!this.isAdmin(request)) {
      return this.error(403, 'Forbidden - admin access required');
    }

    const url = request.url;
    const id = this.extractIdFromUrl(url, '/admins/');

    if (request.method === 'GET') {
      if (id) {
        const admin = this.mockDb.getAdminById(id);
        if (!admin) {
          return this.error(404, 'Admin not found');
        }
        return of(new HttpResponse({ status: 200, body: admin })).pipe(delay(300));
      } else {
        const admins = this.mockDb.getAllAdmins();
        return of(new HttpResponse({ status: 200, body: admins })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      const body = request.body;
      if (!body.userId || !body.email) {
        return this.error(400, 'Missing required fields: userId, email');
      }

      const newAdmin = this.mockDb.createAdmin({
        userId: body.userId,
        email: body.email,
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        role: body.role || 'ADMIN'
      });

      return of(new HttpResponse({ status: 201, body: newAdmin })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      if (!this.mockDb.deleteAdmin(id)) {
        return this.error(404, 'Admin not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ BOARD MEMBERS HANDLERS ============

  private handleBoardMembers(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (!this.isAdmin(request)) {
      return this.error(403, 'Forbidden - admin access required');
    }

    const url = request.url;
    const id = this.extractIdFromUrl(url, '/board-members/');

    if (request.method === 'GET') {
      if (id) {
        const bm = this.mockDb.getBoardMemberById(id);
        if (!bm) {
          return this.error(404, 'Board member not found');
        }
        return of(new HttpResponse({ status: 200, body: bm })).pipe(delay(300));
      } else {
        const bms = this.mockDb.getAllBoardMembers();
        return of(new HttpResponse({ status: 200, body: bms })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      const body = request.body;
      if (!body.userId || !body.clubId || !body.position) {
        return this.error(400, 'Missing required fields: userId, clubId, position');
      }

      const newBm = this.mockDb.createBoardMember({
        userId: body.userId,
        clubId: body.clubId,
        position: body.position,
        joinDate: body.joinDate || new Date().toISOString(),
        email: body.email || '',
        firstName: body.firstName || '',
        lastName: body.lastName || ''
      });

      return of(new HttpResponse({ status: 201, body: newBm })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      if (!this.mockDb.deleteBoardMember(id)) {
        return this.error(404, 'Board member not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ COMMITTEES HANDLERS ============

  private handleCommittees(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (!this.isAdmin(request)) {
      return this.error(403, 'Forbidden - admin access required');
    }

    const url = request.url;
    const id = this.extractIdFromUrl(url, '/committees/');

    // Handle POST /committees/:id/members
    if (request.method === 'POST' && url.includes('/members')) {
      const committeeId = this.extractIdBeforeSegment(url, '/members');
      const body = request.body;
      if (!body.userId) {
        return this.error(400, 'Missing required field: userId');
      }
      if (!this.mockDb.addCommitteeMember(committeeId, body.userId)) {
        return this.error(404, 'Committee not found or member already exists');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    // Handle DELETE /committees/:id/members/:userId
    if (request.method === 'DELETE' && url.includes('/members/')) {
      const committeeId = this.extractIdBeforeSegment(url, '/members');
      const userId = this.extractIdAfterSegment(url, '/members/');
      if (!this.mockDb.removeCommitteeMember(committeeId, userId)) {
        return this.error(404, 'Committee or member not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    if (request.method === 'GET') {
      if (id) {
        const committee = this.mockDb.getCommitteeById(id);
        if (!committee) {
          return this.error(404, 'Committee not found');
        }
        return of(new HttpResponse({ status: 200, body: committee })).pipe(delay(300));
      } else {
        const committees = this.mockDb.getAllCommittees();
        return of(new HttpResponse({ status: 200, body: committees })).pipe(delay(300));
      }
    }

    if (request.method === 'POST') {
      const body = request.body;
      if (!body.clubId || !body.name) {
        return this.error(400, 'Missing required fields: clubId, name');
      }

      const newCommittee = this.mockDb.createCommittee({
        clubId: body.clubId,
        name: body.name,
        description: body.description || '',
        members: body.members || []
      });

      return of(new HttpResponse({ status: 201, body: newCommittee })).pipe(delay(500));
    }

    if (request.method === 'DELETE' && id) {
      if (!this.mockDb.deleteCommittee(id)) {
        return this.error(404, 'Committee not found');
      }
      return of(new HttpResponse({ status: 204, body: null })).pipe(delay(300));
    }

    return this.error(405, 'Method Not Allowed');
  }

  // ============ UTILITIES ============

  private error(status: number, message: string): Observable<never> {
    return throwError(() =>
      new HttpErrorResponse({
        status,
        statusText: this.getStatusText(status),
        error: { message }
      })
    );
  }

  private getStatusText(status: number): string {
    const statusMap: { [key: number]: string } = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      500: 'Internal Server Error'
    };
    return statusMap[status] || 'Unknown';
  }

  private getTokenFromRequest(request: HttpRequest<any>): string | null {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }

  private generateToken(user: MockUser): string {
    // Simple token format: base64(userId:timestamp)
    return btoa(`${user.id}:${Date.now()}`);
  }

  private getUserIdFromToken(token: string): string {
    try {
      const decoded = atob(token);
      const userId = decoded.split(':')[0];
      return userId;
    } catch {
      return '';
    }
  }

  private isAdmin(request: HttpRequest<any>): boolean {
    const token = this.getTokenFromRequest(request);
    if (!token) {
      return false;
    }

    const userId = this.getUserIdFromToken(token);
    const user = this.mockDb.getUserById(userId);

    return user?.role === 'ADMIN';
  }

  private userToResponse(user: MockUser): any {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private getPath(url: string): string {
    try {
      // Try to parse as URL
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      // If it's a relative path, just clean it
      return url.split('?')[0];
    }
  }

  private extractIdFromUrl(url: string, segment: string): string | null {
    const index = url.indexOf(segment);
    if (index === -1) return null;
    
    const afterSegment = url.substring(index + segment.length);
    const parts = afterSegment.split(/[/?]/);
    const id = parts[0];
    
    return id && id.length > 0 && !id.includes('?') ? id : null;
  }

  private extractIdBeforeSegment(url: string, segment: string): string {
    const index = url.indexOf(segment);
    if (index === -1) return '';
    
    const beforeSegment = url.substring(0, index);
    const parts = beforeSegment.split('/');
    return parts[parts.length - 1] || '';
  }

  private extractIdAfterSegment(url: string, segment: string): string {
    const index = url.indexOf(segment);
    if (index === -1) return '';
    
    const afterSegment = url.substring(index + segment.length);
    const parts = afterSegment.split(/[/?]/);
    return parts[0] || '';
  }
}