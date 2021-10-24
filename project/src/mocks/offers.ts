import { customAlphabet } from 'nanoid';
import { CITIES } from '../const';
import { OfferType } from '../types/offer';
import { getRandomFloat, getRandomInteger, getRandomArrayElement, getRandomArrayNonRepeat } from '../utils';

type Coordinates = {
  lat: number;
  lng: number;
}
type OfferCoordinates = {
  Lat: {
    MIN: number,
    MAX: number,
  },
  Lng: {
    MIN: number,
    MAX: number,
  },
}

type CityLocation<T> = {
  [city: string]: T;
}

type OfferLocationType<T> = {
  [city: string]: T;
}

const OfferLocation: OfferLocationType<OfferCoordinates>  = {
  Amsterdam: {
    Lat: {
      MIN: 52.369553943508,
      MAX: 52.3909553943508,
    },
    Lng: {
      MIN: 4.85309666406198,
      MAX: 4.939309666406198,
    },
  },
  Paris: {
    Lat: {
      MIN: 48.89341,
      MAX: 48.8434,
    },
    Lng: {
      MIN: 2.3288,
      MAX: 2.3688,
    },
  },
  Cologne: {
    Lat: {
      MIN: 52.369553943508,
      MAX: 52.3909553943508,
    },
    Lng: {
      MIN: 4.85309666406198,
      MAX: 4.939309666406198,
    },
  },
  Brussels: {
    Lat: {
      MIN: 52.369553943508,
      MAX: 52.3909553943508,
    },
    Lng: {
      MIN: 4.85309666406198,
      MAX: 4.939309666406198,
    },
  },
  Hamburg: {
    Lat: {
      MIN: 48.89341,
      MAX: 48.8434,
    },
    Lng: {
      MIN: 2.3288,
      MAX: 2.3688,
    },
  },
  Dusseldorf: {
    Lat: {
      MIN: 48.89341,
      MAX: 48.8434,
    },
    Lng: {
      MIN: 2.3288,
      MAX: 2.3688,
    },
  },

};

export const CityLoc : CityLocation<Coordinates> = {
  Amsterdam : {lat: 52.3909553943508,
    lng: 4.85309666406198},
  Paris : {lat: 48.85341,
    lng: 2.3488},
  Cologne : {lat: 52.3909553943508,
    lng: 4.85309666406198},
  Brussels : {lat: 52.3909553943508,
    lng: 4.85309666406198},
  Hamburg : {lat: 48.85341,
    lng: 2.3488},
  Dusseldorf : {lat: 48.85341,
    lng: 2.3488},
};


const CARD_COUNT = 20;

const DESCRIPTIONS = ['A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'Beautiful & luxurious studio at great location', 'Canal View Prinsengracht',
  'Wood and stone place', 'Nice, cozy, warm big bed apartment'];
const NAMES = ['Angelina', 'Katya', 'Vasya', 'Petya'];
const APART_TYPES = ['apartment', 'private room', 'house'];
const TITLES = ['Beautiful & luxurious studio at great location', 'Canal View Prinsengracht', 'Wood and stone place', 'Nice, cozy, warm big bed apartment'];
const ID_LENGTH = 3;
const nanoid = customAlphabet('1234567890', ID_LENGTH);
const IMG_PATHS = ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg'];
const GOODS = ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'];
const AVATAR_PATHS = ['img/avatar-angelina.jpg', 'img/avatar-max.jpg'];
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
    description: getRandomArrayNonRepeat(DESCRIPTIONS),
    goods: getRandomArrayNonRepeat(GOODS),
    host: {
      avatarUrl: getRandomArrayElement(AVATAR_PATHS),
      id: +nanoid(),
      isPro: Boolean(getRandomInteger()),
      name: getRandomArrayElement(NAMES),
    },
    id: +nanoid(),
    images: getRandomArrayNonRepeat(IMG_PATHS),
    isFavorite: Boolean(getRandomInteger()),
    isPremium: Boolean(getRandomInteger()),
    location: {
      latitude: getRandomFloat(OfferLocation[cityName].Lat.MIN, OfferLocation[cityName].Lat.MAX, 14),
      longitude: getRandomFloat(OfferLocation[cityName].Lng.MIN, OfferLocation[cityName].Lng.MAX, 14) ,
      zoom: getRandomInteger(1,10),
    },
    maxAdults: getRandomInteger(1,10),
    previewImage: getRandomArrayElement(IMG_PATHS),
    price: getRandomInteger(1, 1000),
    rating: getRandomFloat(0, 5, 1),
    title: getRandomArrayElement(TITLES),
    type: getRandomArrayElement(APART_TYPES),
  });
};

export const offers = new Array(CARD_COUNT).fill(null).map(GenerateOffer);
