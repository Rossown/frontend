export interface AttendanceRecord {
  name: string;
  email: string;
  joinTime: string;
  leaveTime: string;
  duration: number;
  guest: boolean;
  inWaitingRoom: boolean;
}
