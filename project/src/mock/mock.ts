import dayjs from 'dayjs';
import { system, name, internet, random, commerce, address, datatype } from 'faker';
import { CityType, OfferType } from '../types/offer';
import { AuthInfo, CommentType, ReviewType, User } from '../types/review';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const OFFER_LENGTH = 5;
const ID = 1;
const APART_TYPES = ['apartment', 'private room', 'house'];
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const ZOOM = 10;

export const GenerateFakeCity = (): CityType =>
  ({
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: ZOOM,
    },
    name: random.arrayElement(CITIES),
  });

export const GenerateFakeOffer = (): OfferType =>
  ({
    bedrooms: datatype.number({ min: 1, max: 5 }),
    city: GenerateFakeCity(),
    description: commerce.productDescription(),
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: system.filePath(),
      id: ID,
      isPro: datatype.boolean(),
      name: name.firstName(),
    },
    id: ID,
    images: new Array(3).fill(null).map(() => system.filePath()),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: ZOOM,
    },
    maxAdults: datatype.number({ min: 1, max: 5 }),
    previewImage: system.filePath(),
    price: +commerce.price(100, 1000),
    rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
    title: commerce.product(),
    type: random.arrayElement(APART_TYPES),
  });

export const GenerateFakeReview = (): ReviewType =>
  ({
    user: {
      avatarUrl: internet.avatar(),
      id: ID,
      isPro: datatype.boolean(),
      name: name.firstName(),
    },
    id: ID,
    date: dayjs.utc().add(datatype.number({ min: -100, max: 0 }), 'day').format(),
    rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
    comment: 'some comment',
  });

export const fakeComment: CommentType = {
  comment: 'some comment',
  rating: 4,
};

export const fakeAuthInfo: AuthInfo = {
  email: internet.email(),
  token: 'token',
  avatarUrl: system.filePath(),
  id: ID,
  isPro: datatype.boolean(),
  name: name.firstName(),
};

export const fakeUser: User = {
  email: internet.email(),
  password: 'password',
};

export const fakeCity = 'Paris';

export const offersFavoriteParis = new Array(OFFER_LENGTH).fill(null).map((offer, index) =>
  offer = { ...GenerateFakeOffer(), isFavorite: true, id: index, city: { ...GenerateFakeCity(), name: CITIES[0] } });

export const offersFavoriteAmsterdan = new Array(OFFER_LENGTH).fill(null).map((offer, index) =>
  offer = { ...GenerateFakeOffer(), isFavorite: true, id: index, city: { ...GenerateFakeCity(), name: CITIES[3] } });

export const fakeReviews = new Array(OFFER_LENGTH).fill(null).map((review, index) =>
  review = { ...GenerateFakeReview(), id: index});
