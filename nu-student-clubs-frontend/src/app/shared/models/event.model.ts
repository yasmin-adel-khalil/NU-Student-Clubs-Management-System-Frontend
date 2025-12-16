export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  attendeeCount: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: Date;
  attended: boolean;
}
