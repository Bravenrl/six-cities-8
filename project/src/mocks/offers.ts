import { customAlphabet } from 'nanoid';
import { OfferType } from '../types/offer';
import { getRandomFloat, getRandomInteger, getRandomArrayElement } from '../utils';

const CARD_COUNT = 4;
const CITIES = ['Amsterdam'];
const DESCRIPTIONS = ['A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'Beautiful & luxurious studio at great location', 'Canal View Prinsengracht',
  'Wood and stone place', 'Nice, cozy, warm big bed apartment'];
const NAMES = ['Angelina', 'Katya', 'Vasya', 'Petya'];
const APART_TYPES = ['apartment', 'private room', 'house'];
const TITLES = ['Beautiful & luxurious studio at great location', 'Canal View Prinsengracht', 'Wood and stone place', 'Nice, cozy, warm big bed apartment'];
const ID_LENGTH = 3;
const nanoid = customAlphabet('1234567890', ID_LENGTH);

const GenerateOffer = () : OfferType => ({
  bedrooms: getRandomInteger(1,5),
  city: {
    location: {
      latitude: getRandomFloat(-90, 90, 6),
      longitude: getRandomFloat(-180, 180, 6),
      zoom: getRandomInteger(1,10),
    },
    name: getRandomArrayElement(CITIES),
  },
  description: getRandomArrayElement(DESCRIPTIONS),
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/1.png',
    id: +nanoid(),
    isPro: true,
    name: getRandomArrayElement(NAMES),
  },
  id: +nanoid(),
  images: ['img/1.png', 'img/2.png'],
  isFavorite: Boolean(getRandomInteger()),
  isPremium: Boolean(getRandomInteger()),
  location: {
    latitude: getRandomFloat(-90, 90, 6),
    longitude: getRandomFloat(-180, 180, 6),
    zoom: getRandomInteger(1,10),
  },
  maxAdults: getRandomInteger(1,10),
  previewImage: 'img/1.png',
  price: getRandomInteger(1, 1000),
  rating: getRandomFloat(0, 5, 1),
  title: getRandomArrayElement(TITLES),
  type: getRandomArrayElement(APART_TYPES),
});

export const offers = new Array(CARD_COUNT).fill(null).map(GenerateOffer);

