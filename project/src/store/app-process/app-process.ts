import { Actions, ActionType } from '../../types/action';
import { AppProcess } from '../../types/state';

const initialStare: AppProcess = {
  isLoading: false,
  isPosting: false,
};

const appProcess = (state = initialStare, action: Actions): AppProcess => {
  switch (action.type) {
    case ActionType.isLoading:
      return { ...state, isLoading: action.payload };
    case ActionType.isPosting:
      return { ...state, isPosting: action.payload };
    default:
      return state;
  }
};

export { appProcess };
