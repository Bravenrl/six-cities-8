import { createReducer } from '@reduxjs/toolkit';
import { EmptyComment } from '../../const';
import { OfferType } from '../../types/offer';
import { AppData } from '../../types/state';
import { addComent, addComentRating, addUserEmail, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, loadReviews, changeIsFavorite, toggleIsFavorite, removeFavoriteOffers, removeCurrentOffer } from '../action';

const initialState: AppData = {
  offers: [],
  userEmail: '',
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  reviews: [],
  comment: EmptyComment.comment,
  commentRating: EmptyComment.rating,
  favoriteOffers: [],
  currentIsFavorite: null,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(addUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addComent, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(addComentRating, (state, action) => {
      state.commentRating = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(changeIsFavorite, (state, action) => {
      const actualOffer = action.payload;
      if (state.favoriteOffers.length > 0) {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== actualOffer.id);
      }

      state.offers = state.offers.map((offer) => {
        if (offer.id === actualOffer.id) {
          offer.isFavorite = actualOffer.isFavorite;
        }
        return offer;
      });
    })
    .addCase(toggleIsFavorite, (state, action) => {
      const { id, isFavorite } = action.payload;
      state.currentIsFavorite = (state.currentOffer.id === id) ? isFavorite : null;
    })
    .addCase(removeFavoriteOffers, (state) => {
      state.favoriteOffers = [];
    })
    .addCase(removeCurrentOffer, (state) => {
      state.currentOffer = {} as OfferType;
      state.nearbyOffers = [];
      state.currentIsFavorite = null;
      state.reviews = [];
    });
});


export { appData };
