export interface BoardMember {
  id: string;
  userId: string;
  clubId: string;
  position: string;
  joinDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface BoardMemberResponse {
  id: number;
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  clubId?: number;
  position: string;
  joinDate: string;
  endDate?: string;
  isActive: boolean;
  season?: string;
  userName?: string;
  clubName?: string;
  committee?: string;
}

export interface CreateBoardMemberRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  position: string;
  joinDate: string;
  club: { id: number };
}

export interface UpdateBoardMemberRequest {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  endDate?: string;
  isActive?: boolean;
  club?: { id: number };
}

export enum BoardPosition {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  SECRETARY = 'SECRETARY',
  TREASURER = 'TREASURER',
  MEMBER = 'MEMBER'
}
