import { NEXT_STEP, PREVIOUS_STEP, SET_ADDON, SET_PLAN, SET_USER } from './constants';

export const nextStep = () => ({
  type: NEXT_STEP,
});

export const previousStep = () => ({
  type: PREVIOUS_STEP,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setPlan = (plan) => ({
  type: SET_PLAN,
  plan,
});

export const setAddon = (addon) => ({
  type: SET_ADDON,
  addon,
});
