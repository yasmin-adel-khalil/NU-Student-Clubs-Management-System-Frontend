import { Injectable } from '@angular/core';

export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
  createdAt: string;
  updatedAt: string;
}

export interface MockAdmin {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockBoardMember {
  id: string;
  userId: string;
  clubId: string;
  position: string;
  joinDate: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockCommittee {
  id: string;
  clubId: string;
  name: string;
  description: string;
  members?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockClub {
  id: string;
  name: string;
  description?: string;
  overview?: string;
  mission?: string;
  founders?: string;
  president: string;
  presidentId?: string;
  email: string;
  contactEmail?: string;
  category: string;
  logo?: string;
  applicationFormUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  numberOfMembers?: number;
  memberCount?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockEvent {
  id: string;
  clubId: string;
  title: string;
  description: string;
  eventDate?: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  attendeeCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockGalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  clubId: string;
  createdAt: string;
}

interface MockDatabase {
  users: MockUser[];
  admins: MockAdmin[];
  boardMembers: MockBoardMember[];
  committees: MockCommittee[];
  clubs: MockClub[];
  events: MockEvent[];
  gallery: MockGalleryItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDbService {
  private dbKey = 'mock_db';
  private db: MockDatabase = {
    users: [],
    admins: [],
    boardMembers: [],
    committees: [],
    clubs: [],
    events: [],
    gallery: []
  };

  constructor() {
    this.load();
    this.seedIfEmpty();
  }

  /**
   * Load database from localStorage
   */
  load(): void {
    const stored = localStorage.getItem(this.dbKey);
    if (stored) {
      try {
        this.db = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse mock database', e);
        this.db = this.getEmptyDb();
      }
    } else {
      this.db = this.getEmptyDb();
    }
  }

  /**
   * Save database to localStorage
   */
  save(): void {
    localStorage.setItem(this.dbKey, JSON.stringify(this.db));
  }

  /**
   * Reset database (clear all data)
   */
  reset(): void {
    this.db = this.getEmptyDb();
    localStorage.removeItem(this.dbKey);
  }

  /**
   * Seed database with demo data if empty
   */
  seedIfEmpty(): void {
    if (this.db.users.length === 0) {
      this.seedDemoData();
    }
  }

  /**
   * Get empty database structure
   */
  private getEmptyDb(): MockDatabase {
    return {
      users: [],
      admins: [],
      boardMembers: [],
      committees: [],
      clubs: [],
      events: [],
      gallery: []
    };
  }

  /**
   * Seed with demo data
   */
  private seedDemoData(): void {
    const now = new Date().toISOString();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    // Admin user
    const adminUser: MockUser = {
      id: '1',
      email: 'admin@nu.edu.eg',
      firstName: 'Admin',
      lastName: 'User',
      password: 'admin123', // Demo password
      role: 'ADMIN',
      createdAt: now,
      updatedAt: now
    };

    // Student users
    const studentUser1: MockUser = {
      id: '2',
      email: 'student1@nu.edu.eg',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      password: 'student123',
      role: 'STUDENT',
      createdAt: now,
      updatedAt: now
    };

    const studentUser2: MockUser = {
      id: '3',
      email: 'student2@nu.edu.eg',
      firstName: 'Fatima',
      lastName: 'Mohamed',
      password: 'student123',
      role: 'STUDENT',
      createdAt: now,
      updatedAt: now
    };

    // Admin record
    const adminRecord: MockAdmin = {
      id: '1',
      userId: '1',
      email: 'admin@nu.edu.eg',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      createdAt: now,
      updatedAt: now
    };

    // Clubs
    const club1: MockClub = {
      id: '1',
      name: 'Tech Club',
      description: 'A club for technology enthusiasts',
      overview: 'Join us to explore cutting-edge technologies',
      mission: 'To promote technology literacy and innovation',
      founders: 'Ahmed Hassan',
      president: 'Ahmed Hassan',
      presidentId: '2',
      email: 'tech@nu.edu.eg',
      contactEmail: 'tech@nu.edu.eg',
      category: 'Technology',
      logo: 'https://via.placeholder.com/150',
      memberCount: 25,
      numberOfMembers: 25,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    const club2: MockClub = {
      id: '2',
      name: 'Sports Club',
      description: 'A club for sports lovers',
      overview: 'Participate in various sports and fitness activities',
      mission: 'To promote healthy lifestyle and teamwork',
      founders: 'Fatima Mohamed',
      president: 'Fatima Mohamed',
      presidentId: '3',
      email: 'sports@nu.edu.eg',
      contactEmail: 'sports@nu.edu.eg',
      category: 'Sports',
      logo: 'https://via.placeholder.com/150',
      memberCount: 30,
      numberOfMembers: 30,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };

    // Events
    const event1: MockEvent = {
      id: '1',
      clubId: '1',
      title: 'Tech Workshop: Web Development',
      description: 'Learn modern web development techniques',
      startDate: tomorrow,
      endDate: tomorrow,
      eventDate: tomorrow,
      location: 'Tech Lab, Building A',
      capacity: 50,
      attendeeCount: 20,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event2: MockEvent = {
      id: '2',
      clubId: '2',
      title: 'Football Tournament',
      description: 'Inter-club football championship',
      startDate: nextWeek,
      endDate: nextWeek,
      eventDate: nextWeek,
      location: 'Sports Complex',
      capacity: 100,
      attendeeCount: 45,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event3: MockEvent = {
      id: '3',
      clubId: '1',
      title: 'AI & Machine Learning Workshop',
      description: 'Introduction to artificial intelligence and machine learning',
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Computer Lab 301',
      capacity: 40,
      attendeeCount: 15,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event4: MockEvent = {
      id: '4',
      clubId: '2',
      title: 'Basketball Championship',
      description: 'Annual basketball tournament for all students',
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Basketball Court',
      capacity: 80,
      attendeeCount: 32,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event5: MockEvent = {
      id: '5',
      clubId: '1',
      title: 'Hackathon 2026',
      description: '24-hour coding competition with amazing prizes',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Innovation Hub',
      capacity: 60,
      attendeeCount: 28,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event6: MockEvent = {
      id: '6',
      clubId: '2',
      title: 'Yoga & Fitness Session',
      description: 'Weekly yoga and fitness training for all levels',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Gym Hall',
      capacity: 30,
      attendeeCount: 18,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event7: MockEvent = {
      id: '7',
      clubId: '1',
      title: 'Cybersecurity Seminar',
      description: 'Learn about the latest trends in cybersecurity',
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Auditorium B',
      capacity: 100,
      attendeeCount: 67,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    const event8: MockEvent = {
      id: '8',
      clubId: '2',
      title: 'Swimming Competition',
      description: 'Inter-university swimming championship',
      startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Olympic Pool',
      capacity: 50,
      attendeeCount: 22,
      imageUrl: 'https://via.placeholder.com/300x200',
      createdAt: now,
      updatedAt: now
    };

    // Gallery Items
    const galleryItem1: MockGalleryItem = {
      id: '1',
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'Tech Conference 2024',
      description: 'Highlights from our annual tech conference',
      clubId: '1',
      createdAt: now
    };

    const galleryItem2: MockGalleryItem = {
      id: '2',
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'Sports Day',
      description: 'Annual sports day celebration',
      clubId: '2',
      createdAt: now
    };

    // Committees
    const committee1: MockCommittee = {
      id: '1',
      clubId: '1',
      name: 'Technical Committee',
      description: 'Responsible for technical events',
      members: ['2'],
      createdAt: now,
      updatedAt: now
    };

    const committee2: MockCommittee = {
      id: '2',
      clubId: '2',
      name: 'Sports Committee',
      description: 'Responsible for sports events',
      members: ['3'],
      createdAt: now,
      updatedAt: now
    };

    // Board Members
    const boardMember1: MockBoardMember = {
      id: '1',
      userId: '2',
      clubId: '1',
      position: 'President',
      joinDate: now,
      email: 'student1@nu.edu.eg',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      createdAt: now,
      updatedAt: now
    };

    const boardMember2: MockBoardMember = {
      id: '2',
      userId: '3',
      clubId: '2',
      position: 'President',
      joinDate: now,
      email: 'student2@nu.edu.eg',
      firstName: 'Fatima',
      lastName: 'Mohamed',
      createdAt: now,
      updatedAt: now
    };

    // Populate database
    this.db.users = [adminUser, studentUser1, studentUser2];
    this.db.admins = [adminRecord];
    this.db.boardMembers = [boardMember1, boardMember2];
    this.db.committees = [committee1, committee2];
    this.db.clubs = [club1, club2];
    this.db.events = [event1, event2, event3, event4, event5, event6, event7, event8];
    this.db.gallery = [galleryItem1, galleryItem2];

    this.save();
  }

  // ============ USERS ============

  getUserByEmail(email: string): MockUser | undefined {
    return this.db.users.find(u => u.email === email);
  }

  getUserById(id: string): MockUser | undefined {
    return this.db.users.find(u => u.id === id);
  }

  createUser(user: Omit<MockUser, 'id' | 'createdAt' | 'updatedAt'>): MockUser {
    const newUser: MockUser = {
      ...user,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.users.push(newUser);
    this.save();
    return newUser;
  }

  getAllUsers(): MockUser[] {
    return [...this.db.users];
  }

  // ============ ADMINS ============

  getAllAdmins(): MockAdmin[] {
    return [...this.db.admins];
  }

  getAdminById(id: string): MockAdmin | undefined {
    return this.db.admins.find(a => a.id === id);
  }

  createAdmin(admin: Omit<MockAdmin, 'id' | 'createdAt' | 'updatedAt'>): MockAdmin {
    const newAdmin: MockAdmin = {
      ...admin,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.admins.push(newAdmin);
    this.save();
    return newAdmin;
  }

  deleteAdmin(id: string): boolean {
    const index = this.db.admins.findIndex(a => a.id === id);
    if (index >= 0) {
      this.db.admins.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  // ============ BOARD MEMBERS ============

  getAllBoardMembers(): MockBoardMember[] {
    return [...this.db.boardMembers];
  }

  getBoardMemberById(id: string): MockBoardMember | undefined {
    return this.db.boardMembers.find(bm => bm.id === id);
  }

  createBoardMember(
    bm: Omit<MockBoardMember, 'id' | 'createdAt' | 'updatedAt'>
  ): MockBoardMember {
    const newBm: MockBoardMember = {
      ...bm,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.boardMembers.push(newBm);
    this.save();
    return newBm;
  }

  deleteBoardMember(id: string): boolean {
    const index = this.db.boardMembers.findIndex(bm => bm.id === id);
    if (index >= 0) {
      this.db.boardMembers.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  // ============ COMMITTEES ============

  getAllCommittees(): MockCommittee[] {
    return [...this.db.committees];
  }

  getCommitteeById(id: string): MockCommittee | undefined {
    return this.db.committees.find(c => c.id === id);
  }

  createCommittee(
    committee: Omit<MockCommittee, 'id' | 'createdAt' | 'updatedAt'>
  ): MockCommittee {
    const newCommittee: MockCommittee = {
      ...committee,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.committees.push(newCommittee);
    this.save();
    return newCommittee;
  }

  deleteCommittee(id: string): boolean {
    const index = this.db.committees.findIndex(c => c.id === id);
    if (index >= 0) {
      this.db.committees.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  addCommitteeMember(committeeId: string, userId: string): boolean {
    const committee = this.getCommitteeById(committeeId);
    if (committee) {
      if (!committee.members) {
        committee.members = [];
      }
      if (!committee.members.includes(userId)) {
        committee.members.push(userId);
        this.save();
        return true;
      }
    }
    return false;
  }

  removeCommitteeMember(committeeId: string, userId: string): boolean {
    const committee = this.getCommitteeById(committeeId);
    if (committee && committee.members) {
      const index = committee.members.indexOf(userId);
      if (index >= 0) {
        committee.members.splice(index, 1);
        this.save();
        return true;
      }
    }
    return false;
  }

  // ============ CLUBS ============

  getAllClubs(): MockClub[] {
    return [...this.db.clubs];
  }

  getClubById(id: string): MockClub | undefined {
    return this.db.clubs.find(c => c.id === id);
  }

  createClub(club: Omit<MockClub, 'id' | 'createdAt' | 'updatedAt'>): MockClub {
    const newClub: MockClub = {
      ...club,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.clubs.push(newClub);
    this.save();
    return newClub;
  }

  updateClub(id: string, updates: Partial<MockClub>): MockClub | undefined {
    const club = this.getClubById(id);
    if (club) {
      Object.assign(club, updates, {
        updatedAt: new Date().toISOString()
      });
      this.save();
      return club;
    }
    return undefined;
  }

  deleteClub(id: string): boolean {
    const index = this.db.clubs.findIndex(c => c.id === id);
    if (index >= 0) {
      this.db.clubs.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  // ============ EVENTS ============

  getAllEvents(): MockEvent[] {
    return [...this.db.events];
  }

  getEventById(id: string): MockEvent | undefined {
    return this.db.events.find(e => e.id === id);
  }

  createEvent(event: Omit<MockEvent, 'id' | 'createdAt' | 'updatedAt'>): MockEvent {
    const newEvent: MockEvent = {
      ...event,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.db.events.push(newEvent);
    this.save();
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<MockEvent>): MockEvent | undefined {
    const event = this.getEventById(id);
    if (event) {
      Object.assign(event, updates, {
        updatedAt: new Date().toISOString()
      });
      this.save();
      return event;
    }
    return undefined;
  }

  deleteEvent(id: string): boolean {
    const index = this.db.events.findIndex(e => e.id === id);
    if (index >= 0) {
      this.db.events.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  // ============ GALLERY ============

  getAllGallery(): MockGalleryItem[] {
    return [...this.db.gallery];
  }

  getGalleryItemById(id: string): MockGalleryItem | undefined {
    return this.db.gallery.find(g => g.id === id);
  }

  createGalleryItem(
    item: Omit<MockGalleryItem, 'id' | 'createdAt'>
  ): MockGalleryItem {
    const newItem: MockGalleryItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };
    this.db.gallery.push(newItem);
    this.save();
    return newItem;
  }

  deleteGalleryItem(id: string): boolean {
    const index = this.db.gallery.findIndex(g => g.id === id);
    if (index >= 0) {
      this.db.gallery.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  // ============ UTILITIES ============

  private generateId(): string {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getDatabase(): MockDatabase {
    return this.db;
  }
}
