export interface CustomResponse<T> {
  status: boolean;
  data?: T | null;
  error?: boolean;
  message: string;
}

export interface EventSummary {
  _id: number;
  EventName: string;
}
