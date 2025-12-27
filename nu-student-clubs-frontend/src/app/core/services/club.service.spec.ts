import { TestBed } from '@angular/core/testing';
import { ClubService } from './club.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ClubService', () => {
  let service: ClubService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Create a mock ApiService
    const apiSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    
    TestBed.configureTestingModule({
      providers: [
        ClubService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });
    
    service = TestBed.inject(ClubService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clubs', (done) => {
    const mockClubs = [
      { id: 1, name: 'Tech Club', category: 'Technology', email: 'tech@nu.edu', president: 'John', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 2, name: 'Art Club', category: 'Arts', email: 'art@nu.edu', president: 'Jane', createdAt: '2024-01-01', updatedAt: '2024-01-01' }
    ];

    apiService.get.and.returnValue(of({ content: mockClubs }));

    service.getAllClubs(0, 100).subscribe(response => {
      expect(apiService.get).toHaveBeenCalledWith('/clubs?page=0&size=100');
      expect(response.content).toEqual(mockClubs);
      done();
    });
  });

  it('should fetch a single club by ID', (done) => {
    const mockClub = {
      id: 1,
      name: 'Tech Club',
      category: 'Technology',
      email: 'tech@nu.edu',
      president: 'John',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    };

    apiService.get.and.returnValue(of(mockClub));

    service.getClubById(1).subscribe(club => {
      expect(apiService.get).toHaveBeenCalledWith('/clubs/1');
      expect(club).toEqual(mockClub);
      done();
    });
  });

  it('should search clubs by name', (done) => {
    const mockClubs = [
      { id: 1, name: 'Tech Club', category: 'Technology', email: 'tech@nu.edu', president: 'John', createdAt: '2024-01-01', updatedAt: '2024-01-01' }
    ];

    apiService.get.and.returnValue(of(mockClubs));

    service.searchClubsByName('Tech').subscribe(clubs => {
      expect(apiService.get).toHaveBeenCalledWith('/clubs/search?name=Tech');
      expect(clubs).toEqual(mockClubs);
      done();
    });
  });

  it('should get clubs by category', (done) => {
    const mockClubs = [
      { id: 1, name: 'Tech Club', category: 'Technology', email: 'tech@nu.edu', president: 'John', createdAt: '2024-01-01', updatedAt: '2024-01-01' }
    ];

    apiService.get.and.returnValue(of(mockClubs));

    service.getClubsByCategory('Technology').subscribe(clubs => {
      expect(apiService.get).toHaveBeenCalledWith('/clubs/category/Technology');
      expect(clubs).toEqual(mockClubs);
      done();
    });
  });
});
