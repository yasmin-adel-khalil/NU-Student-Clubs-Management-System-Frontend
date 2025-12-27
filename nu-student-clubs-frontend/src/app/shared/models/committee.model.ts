export interface Committee {
  id: string;
  name: string;
  clubId: string;
  description: string;
  memberIds: string[];
  headId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CommitteeResponse {
  id: number;
  name: string;
  clubId?: number;
  description: string;
  memberIds?: string[];
  headId?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  clubName?: string;
  headName?: string;
  memberCount?: number;
}

export interface CreateCommitteeRequest {
  name: string;
  description: string;
  clubName?: string;
  headName?: string;
  club?: { id: number };
  memberIds?: string[];
}

export interface UpdateCommitteeRequest {
  name?: string;
  description?: string;
  headName?: string;
  memberIds?: string[];
  isActive?: boolean;
  clubName?: string;
  club?: { id: number };
}

export interface CommitteeWithMembers extends CommitteeResponse {
  members?: CommitteeMember[];
}

export interface CommitteeMember {
  userId: string;
  userName: string;
  role: string;
  joinDate: string;
}
