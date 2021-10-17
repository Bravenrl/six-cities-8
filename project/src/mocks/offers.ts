import { customAlphabet } from 'nanoid';

import { OfferType } from '../types/offer';
import { getRandomFloat, getRandomInteger, getRandomArrayElement } from '../utils';

type Coordinates = {
  lat: number;
  lng: number;
}

type CityLocation<T> = {
  [city: string]: T;
}


const Lat = {
  MIN: 52.369553943508,
  MAX: 52.3909553943508,
};

const Lon = {
  MIN: 4.85309666406198,
  MAX: 4.939309666406198,
};


export const CityLoc : CityLocation<Coordinates> = {
  Amsterdam : {lat: 52.3909553943508,
    lng: 4.85309666406198},
};


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


const GenerateOffer = () : OfferType => {
  const cityName = getRandomArrayElement(CITIES);
  return ({
    bedrooms: getRandomInteger(1,5),
    city: {
      location: {
        latitude: CityLoc[cityName].lat,
        longitude: CityLoc[cityName].lng,
        zoom: getRandomInteger(9,10),
      },
      name: cityName,
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
      latitude: getRandomFloat(Lat.MIN, Lat.MAX, 14),
      longitude: getRandomFloat(Lon.MIN, Lon.MAX, 14),
      zoom: getRandomInteger(1,10),
    },
    maxAdults: getRandomInteger(1,10),
    previewImage: 'img/1.png',
    price: getRandomInteger(1, 1000),
    rating: getRandomFloat(0, 5, 1),
    title: getRandomArrayElement(TITLES),
    type: getRandomArrayElement(APART_TYPES),
  });
};

export const offers = new Array(CARD_COUNT).fill(null).map(GenerateOffer);
