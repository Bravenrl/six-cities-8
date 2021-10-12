import { HostType } from './offer';

export type CommentType = {
  comment: string;
  date: Date;
  id: number;
  rating: number;
  user: HostType;
}
