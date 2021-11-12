import { AppProcess } from '../../types/state';
import { toggleIsLoading, toggleIsPosting } from '../action';
import { appProcess } from './app-process';

const initialState: AppProcess = {
  isLoading: false,
  isPosting: false,
};


describe('Reducer: appProcess', () => {
  let state = initialState;
  beforeAll(() => state = initialState);
  it('without additional parameters should return initial state', () => {
    expect(appProcess(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
  it('should change isLoading by toggleIsLoading', () => {
    const isLoading = true;
    expect(appProcess(state, toggleIsLoading(isLoading)))
      .toEqual({ ...state, isLoading });
  });
  it('should change isPosting by toggleIsPosting', () => {
    const isPosting = true;
    expect(appProcess(state, toggleIsPosting(isPosting)))
      .toEqual({ ...state, isPosting });
  });
});
