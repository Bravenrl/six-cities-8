import { AUTN_TOKEN_NAME } from './const';


export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTN_TOKEN_NAME) ?? '';

export const setToken = (token: Token): void => localStorage.setItem(AUTN_TOKEN_NAME, token);

export const removeToken = (): void => localStorage.removeItem(AUTN_TOKEN_NAME);
