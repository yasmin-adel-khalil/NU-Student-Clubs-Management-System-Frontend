export interface Admin {
  id: string;
  userId: string;
  role: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminResponse {
  id: string;
  userId: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminRequest {
  userId: string;
  role: string;
  permissions: string[];
}

export interface UpdateAdminRequest {
  role?: string;
  permissions?: string[];
}
