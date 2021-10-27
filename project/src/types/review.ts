import { HostType, ServerHostType } from './offer';

export type CommentType = {
  comment: string;
  date: string;
};

export type ReviewType = CommentType&{
  id: number;
  rating: number;
  user: HostType;
};

export type ServerReviewType = Omit<ReviewType, 'user'>&{
  user: ServerHostType;
};

export type User = {
  email: string;
  password: string;
};

export type Auth = {
  email: string;
  token: string;
};

export type ServerAurhInfo = Auth&ServerHostType;

export type AuthInfo = Auth&HostType;
