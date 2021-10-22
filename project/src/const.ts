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
