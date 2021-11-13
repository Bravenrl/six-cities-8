import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { fakeAuthInfo, fakeComment, fakeUser, GenerateFakeOffer, GenerateFakeReview } from '../mock/mock';
import { ApiRoute, AUTN_TOKEN_NAME, HttpCode } from '../services/const';
import {
  toggleIsLoading, loadOffers, requireAuthorization,
  addUserEmail, redirectToRoute, loadCurrentOffer,
  loadNearbyOffers, loadReviews, addComment,
  addComentRating, changeIsFavorite, loadFavoriteOffers, toggleIsFavorite, toggleIsPosting, historyBack, requireLogout
} from './action';
// import { AppRoute, AuthorizationStatus, EmptyComment, Status } from '../const';
import { checkAuthStatusAction, loadFavoriteOffersAction, loadOffersAction, loadPropertyOffersAction, loginAction, logoutAction, postCommentAction, postFavoriteAction } from './api-action';
import { adaptAuthInfoToClient, adaptOfferToCient, adaptReviewToCient } from '../services/adapter';
import { AppRoute, AuthorizationStatus, EmptyComment, Status } from '../const';


jest.mock('../services/adapter');

const fakeAdaptAuthInfoToClient = adaptAuthInfoToClient as jest.MockedFunction<typeof adaptAuthInfoToClient>;
const fakeAdaptReviewToCient = adaptReviewToCient as jest.MockedFunction<typeof adaptReviewToCient>;
const fakeAdaptOfferToCient = adaptOfferToCient as jest.MockedFunction<typeof adaptOfferToCient>;

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createApi(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  const fakeOffer = GenerateFakeOffer();
  const fakeOffers = [fakeOffer, fakeOffer, fakeOffer, fakeOffer];
  const fakeReview = GenerateFakeReview();
  const fakeReviews = [fakeReview, fakeReview, fakeReview, fakeReview];
  const id = 1;
  it('should dispatch loadOffersAction when GET /hotels', async () => {
    mockAPI.onGet(ApiRoute.Offers).reply(HttpCode.OK, fakeOffers);
    const store = mockStore();
    fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
    await store.dispatch(loadOffersAction());
    expect(store.getActions()).toEqual(
      [toggleIsLoading(true), loadOffers(fakeOffers), toggleIsLoading(false)]);
    expect(fakeAdaptOfferToCient).toBeCalledTimes(4);
  });

  it('should dispatch loadPropertyOffersAction when GET /hotels/:id HttpCode.OK', async () => {
    mockAPI
      .onGet(`${ApiRoute.Offers}/${id}`)
      .reply(HttpCode.OK, fakeOffer)
      .onGet(`${ApiRoute.Offers}/${id}${ApiRoute.NearbyOffers}`)
      .reply(HttpCode.OK, fakeOffers)
      .onGet(`${ApiRoute.Reviews}/${id}`)
      .reply(HttpCode.OK, fakeReviews);
    const store = mockStore();
    fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
    fakeAdaptReviewToCient.mockReturnValue(fakeReview);
    await store.dispatch(loadPropertyOffersAction(`${id}`));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      loadNearbyOffers(fakeOffers),
      loadCurrentOffer(fakeOffer),
      loadReviews(fakeReviews),
      toggleIsFavorite(fakeOffer.isFavorite, fakeOffer.id),
      toggleIsLoading(false)]);
    expect(fakeAdaptOfferToCient).toBeCalledTimes(5);
    expect(fakeAdaptReviewToCient).toBeCalledTimes(4);
  });

  it('should dispatch loadPropertyOffersAction when GET /hotels/:id HttpCode.NotFound', async () => {
    mockAPI
      .onGet(`${ApiRoute.Offers}/${id}`)
      .reply(HttpCode.NotFound, fakeOffer)
      .onGet(`${ApiRoute.Offers}/${id}${ApiRoute.NearbyOffers}`)
      .reply(HttpCode.OK, fakeOffers)
      .onGet(`${ApiRoute.Reviews}/${id}`)
      .reply(HttpCode.OK, fakeReviews);
    const store = mockStore();
    fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
    fakeAdaptReviewToCient.mockReturnValue(fakeReview);
    await store.dispatch(loadPropertyOffersAction(`${id}`));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      redirectToRoute(AppRoute.NotFound),
      toggleIsLoading(false)]);
    expect(fakeAdaptOfferToCient).not.toBeCalled();
    expect(fakeAdaptReviewToCient).not.toBeCalled();
  });

  it('should dispatch postCommentAction when POST /comments', async () => {
    mockAPI
      .onPost(`${ApiRoute.Reviews}/${id}`)
      .reply(HttpCode.OK, fakeReviews);
    const store = mockStore();
    fakeAdaptReviewToCient.mockReturnValue(fakeReview);
    await store.dispatch(postCommentAction(fakeComment, `${id}`));
    expect(store.getActions()).toEqual(
      [toggleIsPosting(true), addComment(EmptyComment.comment),
        addComentRating(EmptyComment.rating),
        loadReviews(fakeReviews), toggleIsPosting(false)]);
    expect(fakeAdaptReviewToCient).toBeCalledTimes(4);
  });

  it('should dispatch postFavoriteAction when POST /favorite', async () => {
    mockAPI
      .onPost(`${ApiRoute.Favorite}/${id}/${Status.add}`)
      .reply(HttpCode.OK, fakeOffer);
    const store = mockStore();
    fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
    await store.dispatch(postFavoriteAction(Status.add, `${id}`));
    expect(store.getActions()).toEqual(
      [toggleIsPosting(true), changeIsFavorite(fakeOffer),
        toggleIsFavorite(fakeOffer.isFavorite, fakeOffer.id), toggleIsPosting(false)]);
    expect(fakeAdaptOfferToCient).toBeCalledTimes(1);
  });

  it('should dispatch loadFavoriteOffersAction when GET /favorite', async () => {
    mockAPI
      .onGet(ApiRoute.Favorite)
      .reply(HttpCode.OK, fakeOffers);
    const store = mockStore();
    fakeAdaptOfferToCient.mockReturnValue(fakeOffer);
    await store.dispatch(loadFavoriteOffersAction());
    expect(store.getActions()).toEqual(
      [toggleIsLoading(true), loadFavoriteOffers(fakeOffers), toggleIsLoading(false)]);
    expect(fakeAdaptOfferToCient).toBeCalledTimes(4);
  });

  it('should dispatch checkAuthStatusAction when GET /login', async () => {
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(HttpCode.OK, fakeAuthInfo);
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    expect(store.getActions()).toEqual([]);
    fakeAdaptAuthInfoToClient.mockReturnValue(fakeAuthInfo);
    await store.dispatch(checkAuthStatusAction());
    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth), addUserEmail(fakeAuthInfo.email)]);
    expect(Storage.prototype.setItem).toBeCalled();
    expect(fakeAdaptAuthInfoToClient).toBeCalled();
    expect(Storage.prototype.setItem).toBeCalledWith(AUTN_TOKEN_NAME, fakeAuthInfo.token);
  });

  it('should dispatch loginAction when POST /login', async () => {
    mockAPI
      .onPost(ApiRoute.Login, fakeUser)
      .reply(200, {token: fakeAuthInfo.token});
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    fakeAdaptAuthInfoToClient.mockReturnValue(fakeAuthInfo);
    await store.dispatch(loginAction(fakeUser));
    expect(store.getActions()).toEqual([
      toggleIsLoading(true),
      requireAuthorization(AuthorizationStatus.Auth),
      addUserEmail(fakeAuthInfo.email),
      historyBack(),
      toggleIsLoading(false)]);
    expect(Storage.prototype.setItem).toBeCalled();
    expect(Storage.prototype.setItem).toBeCalledWith(AUTN_TOKEN_NAME, fakeAuthInfo.token);
    expect(fakeAdaptAuthInfoToClient).toBeCalled();
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(204);
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();
    await store.dispatch(logoutAction());
    expect(store.getActions()).toEqual([
      requireLogout(),
      addUserEmail(''),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTN_TOKEN_NAME);
  });
});
