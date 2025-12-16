export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubMembership {
  id: string;
  clubId: string;
  userId: string;
  role: MemberRole;
  joinedAt: Date;
}

export enum MemberRole {
  MEMBER = 'MEMBER',
  OFFICER = 'OFFICER',
  LEADER = 'LEADER'
}
