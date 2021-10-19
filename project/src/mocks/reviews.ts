import {getRandomInteger, getRandomArrayElement} from '../utils';
import { customAlphabet } from 'nanoid';
import { ReviewType } from '../types/review';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


const generateDate = () => dayjs.utc().add(getRandomInteger(-100, 0), 'day').format();
const NAMES = ['Angelina', 'Katya', 'Vasya', 'Petya'];
const TITLES = ['Beautiful & luxurious studio at great location', 'Canal View Prinsengracht', 'Wood and stone place', 'Nice, cozy, warm big bed apartment'];
const ID_LENGTH = 3;
const nanoid = customAlphabet('1234567890', ID_LENGTH);
const AVATAR_PATHS = ['img/avatar-angelina.jpg', 'img/avatar-max.jpg'];
const GenerateReview = () : ReviewType =>
  ({
    user: {
      avatarUrl: getRandomArrayElement(AVATAR_PATHS),
      id: +nanoid(),
      isPro: Boolean(getRandomInteger()),
      name: getRandomArrayElement(NAMES),
    },
    id: +nanoid(),
    date: generateDate(),
    rating: getRandomInteger(1, 5),
    comment: getRandomArrayElement(TITLES),
  });
export const reviews = new Array(getRandomInteger(0,6)).fill(null).map(GenerateReview);


