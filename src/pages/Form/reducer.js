import { produce } from 'immer';
import { NEXT_STEP, PREVIOUS_STEP, SET_ADDON, SET_PLAN, SET_USER } from './constants';

export const initialState = {
  currentStep: 0,
  user: {},
  plan: {},
  addon: {},
};

export const storedKey = ['user', 'plan', 'addon'];

const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NEXT_STEP:
        if (state.currentStep < 4) {
          draft.currentStep = state.currentStep + 1;
        }
        break;
      case PREVIOUS_STEP:
        if (draft.currentStep !== 0) {
          draft.currentStep = state.currentStep - 1;
        }
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case SET_PLAN:
        draft.plan = action.plan;
        break;
      case SET_ADDON:
        draft.addon = action.addon;
        break;
      default:
        return state;
    }
  });

export default formReducer;
