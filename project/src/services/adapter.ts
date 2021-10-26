import { HostType, OfferType, ServerHostType, ServerOfferType } from '../types/offer';

export const adaptOfferToCient = (offer:ServerOfferType) : OfferType => {
  const {'is_pro': isPro, 'avatar_url': avatarUrl, ...restHost} = offer.host;

  const adaptedHost: HostType = {
    ...restHost,
    isPro,
    avatarUrl,
  };

  const {'is_favorite': isFavorite, 'is_premium': isPremium, 'max_adults': maxAdults,
    'preview_image': previewImage, host, ...rest}=offer;

  const adaptedOffer = {
    ...rest,
    isFavorite,
    isPremium,
    maxAdults,
    previewImage,
    host: adaptedHost,
  };


  return adaptedOffer;
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

  const adaptedOffer = {
    ...rest,
    'is_favorite': isFavorite,
    'is_premium': isPremium,
    'max_adults': maxAdults,
    'preview_image': previewImage,
    host: adaptedHost,
  };
  return adaptedOffer;
};


