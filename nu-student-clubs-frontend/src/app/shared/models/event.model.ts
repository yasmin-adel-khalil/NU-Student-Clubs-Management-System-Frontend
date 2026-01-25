export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  eventDate?: Date | string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  capacity: number;
  attendeeCount: number;
  imageUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: Date;
  attended: boolean;
}
