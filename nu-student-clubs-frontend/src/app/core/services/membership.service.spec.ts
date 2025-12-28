import { TestBed } from '@angular/core/testing';
import { MembershipService } from './membership.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('MembershipService', () => {
  let service: MembershipService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    
    TestBed.configureTestingModule({
      providers: [
        MembershipService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });
    
    service = TestBed.inject(MembershipService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all memberships', (done) => {
    const mockMemberships = [
      { id: 1, userId: 1, clubId: 1, joinedAt: '2024-01-01' },
      { id: 2, userId: 1, clubId: 2, joinedAt: '2024-02-01' }
    ];

    apiService.get.and.returnValue(of(mockMemberships));

    service.getAllMemberships().subscribe(memberships => {
      expect(apiService.get).toHaveBeenCalledWith('/applications');
      expect(memberships).toEqual(mockMemberships);
      done();
    });
  });

  it('should apply for membership', (done) => {
    const mockMembership = { id: 1, userId: 1, clubId: 1, joinedAt: '2024-01-01' };
    const request = { userId: 1, clubId: 1 };

    apiService.post.and.returnValue(of(mockMembership));

    service.applyForMembership(request).subscribe(membership => {
      expect(apiService.post).toHaveBeenCalledWith('/applications', request);
      expect(membership).toEqual(mockMembership);
      done();
    });
  });

  it('should delete a membership', (done) => {
    apiService.delete.and.returnValue(of(void 0));

    service.deleteMembership(1).subscribe(() => {
      expect(apiService.delete).toHaveBeenCalledWith('/applications/1');
      done();
    });
  });

  it('should get user memberships', (done) => {
    const mockMemberships = [
      { id: 1, userId: 1, clubId: 1, joinedAt: '2024-01-01' },
      { id: 2, userId: 1, clubId: 2, joinedAt: '2024-02-01' }
    ];

    apiService.get.and.returnValue(of(mockMemberships));

    service.getMyMemberships(1).subscribe(memberships => {
      expect(apiService.get).toHaveBeenCalledWith('/applications');
      expect(memberships).toEqual(mockMemberships);
      done();
    });
  });
});
