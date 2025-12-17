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
  id: string;
  name: string;
  clubId: string;
  description: string;
  memberIds: string[];
  headId: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  clubName?: string;
  headName?: string;
  memberCount?: number;
}

export interface CreateCommitteeRequest {
  name: string;
  clubId: string;
  description: string;
  headId: string;
  memberIds?: string[];
}

export interface UpdateCommitteeRequest {
  name?: string;
  description?: string;
  headId?: string;
  memberIds?: string[];
  isActive?: boolean;
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
