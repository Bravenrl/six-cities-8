import { CityType } from './types/offer';

export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  RoomProprety = '/offer/:id',
  NotFound = '/notfound'
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

export const OPTION_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export enum SortType {
  Popular = 'Popular',
  PriceToHight = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

export const INITIAL_CITY = 'Paris';

export const Cities = new Map<string, CityType>([
  ['Paris', {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  }],
  ['Cologne', {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  }],
  ['Brussels', {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  }],
  ['Amsterdam', {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  }],
  ['Hamburg', {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  }],
  ['Dusseldorf', {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  }],
]);

export const rePassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{2,}/;
export const reEmail = /.+@.+\..+/i;
export const invalidPassword = 'Invalid password';
export const invalidEmail = 'Invalid email';


export const Star = new Map<number, string>([
  [5, 'perfect'], [4, 'good'], [3, 'not bad'], [2, 'badly'], [1, 'terribly'],
]);

export const EmptyComment = {
  comment: '',
  rating: 0,
};

export const enum Status {
  add = 1,
  delete = 0,
}

export const MAX_COMENT_VAL = 10;


export const enum TestID {
  LoginEmail = 'email',
  LoginPassword = 'password',
  LoginButton = 'button',
  LoginLink = 'link',
  MapSection = 'map',
  OfferListDiv = 'offer',
  ButtonSvg = 'svg',
  Option = 'span',
}

export const TestReg = {
  MainPage: new RegExp('Cities', 'i'),
  LoginEmail: new RegExp('E-mail', 'i'),
  LoginPassword: new RegExp('Password', 'i'),
  PropertyPage: new RegExp('Meet the host', 'i'),
  FavoritePage: new RegExp('Saved listing', 'i'),
  BackToRoot: new RegExp('Вернуться на главную', 'i'),
  NotFoundPage: new RegExp('404. Page not found', 'i'),
  LoginButton: new RegExp('Sign in', 'i'),
  Preloader: new RegExp('Loading', 'i'),
  PlaceAltText: new RegExp('Place', 'i'),
  Root: new RegExp('root', 'i'),
  FakeCity: new RegExp('Paris', 'i'),
  NonExpectCity: new RegExp('Cologne', 'i'),
  LogoAltText: new RegExp('6 cities logo', 'i'),
  SignOut: new RegExp('Sign out', 'i'),
  SignIn: new RegExp('Sign in', 'i'),
  Favorite: new RegExp('favorite', 'i'),
  Property: new RegExp('property', 'i'),
  PremiumMark: new RegExp('Premium', 'i'),
  Login: new RegExp('login', 'i'),
  ImgAltText: new RegExp('Studio', 'i'),
  AvatarAltText: new RegExp('Reviews avatar', 'i'),
  RatingText: new RegExp('Rating', 'i'),
  ReviewsText: new RegExp('Reviews', 'i'),
  ButtonIsFavorite: new RegExp('In bookmarks', 'i'),
  ButtonNonFavorite: new RegExp('To bookmarks', 'i'),
  FavoriteEmptyFirst: new RegExp('Nothing yet saved', 'i'),
  FavoriteEmptySecond: new RegExp('Save properties to narrow down', 'i'),
  OptionText: new RegExp('Sort by', 'i'),
};

export const ROOT = `${TestReg.Root}`;

export const FAVORITE = `${TestReg.Favorite}`;

export const PROPERTY = `${TestReg.Property}`;

export const LOGIN = `${TestReg.Login}`;
