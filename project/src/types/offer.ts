export type OfferType = {
  city: CityType;
  bedrooms: number;
  description: string[];
  goods: string[];
  host: HostType;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationType;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

type LocationType = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type CityType = {
    location: LocationType;
    name: string;
}

export type HostType = {
  avatarUrl: string;
  id:number;
  isPro: boolean;
  name: string;
}
export type MapStyleType = {
  height: string;
  width: string;
  margin: string;
}

export type ServerHostType =
Omit<HostType, 'avatarUrl' | 'isPro'>&
{
  'is_pro' : boolean;
  'avatar_url': string;
};

export type ServerOfferType = Omit<OfferType, 'host'|'isFavorite'|'isPremium'|'maxAdults'|'previewImage'>&
{
  host: ServerHostType;
  'is_favorite': boolean;
  'is_premium': boolean;
  'max_adults': number;
  'preview_image': string;
}
