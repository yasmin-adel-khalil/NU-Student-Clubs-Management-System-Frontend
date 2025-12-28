export interface AdminResponse {
  id: number;
  name: string;
  position: string;
  club: string;
  committee: string;
  season: number | null;
}

export interface CreateAdminRequest {
  name: string;
  position: string;
  club: string;
  season: number | null;
}

export interface UpdateAdminRequest {
  name?: string;
  position?: string;
  club?: string;
  season?: number | null;
}
