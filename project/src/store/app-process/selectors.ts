import { State } from '../../types/state';
import { Reducer } from '../root-reducer';

export const getIsLoading = (state: State): boolean => state[Reducer.app].isLoading;

export const getIsPosting = (state: State): boolean => state[Reducer.app].isPosting;

