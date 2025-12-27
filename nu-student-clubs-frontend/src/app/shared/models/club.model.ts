// Backend Response Model
export interface Club {
  id: number;
  name: string;
  description?: string;
  overview?: string;
  mission?: string;
  founders?: string;
  president: string;
  presidentId?: number;
  email: string;
  contactEmail?: string;
  category: string;
  logo?: string;
  applicationFormUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  numberOfMembers?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

// DTO for creating/updating clubs
export interface ClubRequest {
  name: string;
  description?: string;
  overview?: string;
  mission?: string;
  founders?: string;
  president: string;
  presidentId?: number;
  email: string;
  contactEmail?: string;
  category: string;
  logo?: string;
  applicationFormUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  numberOfMembers?: number;
  isActive?: boolean;
}

export interface ClubResponse extends Club {}

// For filtering
export interface ClubFilters {
  category?: string;
  searchQuery?: string;
}
