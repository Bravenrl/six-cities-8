export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomProprety = '/offer/:id',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum PageType {
  Main = 'cities',
  Favorites = 'favorites',
  Property = 'near-places',
}

export const CustomIcon = {
  DEFAULT: 'img/pin.svg',
  CURRENT: 'img/pin-active.svg',
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const OPTION_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export enum SortType {
  Popular = 'Popular',
  PriceToHight = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

export enum ApiRoute {
  Hotels = '/hotels',
}
