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
  id: string;
  userId: string;
  clubId: string;
  position: string;
  joinDate: string;
  endDate?: string;
  isActive: boolean;
  userName?: string;
  clubName?: string;
}

export interface CreateBoardMemberRequest {
  userId: string;
  clubId: string;
  position: string;
  joinDate: string;
}

export interface UpdateBoardMemberRequest {
  position?: string;
  endDate?: string;
  isActive?: boolean;
}

export enum BoardPosition {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  SECRETARY = 'SECRETARY',
  TREASURER = 'TREASURER',
  MEMBER = 'MEMBER'
}
