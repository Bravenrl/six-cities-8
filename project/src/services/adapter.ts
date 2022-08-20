import { HostType, OfferType, ServerHostType, ServerOfferType } from '../types/offer';
import { AuthInfo, ReviewType, ServerAurhInfo, ServerReviewType } from '../types/review';

const adaptHostToClient = (host:ServerHostType): HostType => {
  const {'is_pro': isPro, 'avatar_url': avatarUrl, ...restUser} = host;
  return {
    ...restUser,
    isPro,
    avatarUrl,
  };
};

export const adaptOfferToCient = (offer:ServerOfferType) : OfferType => {
  const {'is_favorite': isFavorite, 'is_premium': isPremium, 'max_adults': maxAdults,
    'preview_image': previewImage, host, ...rest}=offer;
  return {
    ...rest,
    isFavorite,
    isPremium,
    maxAdults,
    previewImage,
    host: adaptHostToClient(host),
  };
};

export const adaptReviewToCient = (review:ServerReviewType) : ReviewType => {
  const {user, ...rest}=review;
  return {
    ...rest,
    user: adaptHostToClient(user),
  };
};

export const adaptAuthInfoToClient = (authInfo: ServerAurhInfo): AuthInfo => {
  const {email, token, ...rest}=authInfo;
  return {
    ...adaptHostToClient(rest),
    email,
    token,
  };
};

export const adaptOfferToServer = (offer:OfferType) : ServerOfferType => {
  const {isPro, avatarUrl, ...restHost} = offer.host;
  const adaptedHost: ServerHostType = {
    ...restHost,
    'is_pro': isPro, 
    'avatar_url': avatarUrl,
  };
  const {isFavorite, isPremium, maxAdults,
    previewImage, host, ...rest}=offer;
  return {
    ...rest,
    'is_favorite': isFavorite,
    'is_premium': isPremium,
    'max_adults': maxAdults,
    'preview_image': previewImage,
    host: adaptedHost,
  };
};

