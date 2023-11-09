import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFormState = (state) => state.form || initialState;

export const selectCurrentStep = createSelector(selectFormState, (state) => state.currentStep);
export const selectUser = createSelector(selectFormState, (state) => state.user);
export const selectPlan = createSelector(selectFormState, (state) => state.plan);
export const selectAddon = createSelector(selectFormState, (state) => state.addon);
