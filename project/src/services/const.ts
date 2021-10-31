export const API_URL = 'https://8.react.pages.academy/six-cities';
export const REQEST_TIMEOUT = 5000;
export const AUTN_TOKEN_NAME = 'six-cities-token';

export enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export const enum HttpCode {
  Unauthorised = 401,
  NotFound = 404,
  BadRequest = 400,
}

export const enum ToastMessage {
  Unauthorised = 'log in, please',
  ВadRequest = 'request error, check the entered data',
  NotFound = 'data not available',
  NetworkErr = 'network error',
  LoadFiail = 'failed data loading'
}
