// Backend Response Model
export interface Membership {
  id: number;
  userId: number;
  clubId: number;
  joinedAt: string;
}

// DTO for creating membership
export interface MembershipRequest {
  userId: number;
  clubId: number;
}

export interface MembershipResponse extends Membership {}
