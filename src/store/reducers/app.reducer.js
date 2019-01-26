import createReducer from './create-reducer';
import * as actions from '../actions/types';

const initialState = {
  backgroundColor: '#F0F0F0',
};

const updateBackgroundColor = (state, action) => {
  return {
    ...state,
    backgroundColor: action.backgroundColor,
  };
};

const busReducer = createReducer(initialState, {
  [actions.UPDATE_BACKGROUND_COLOR]: updateBackgroundColor,
});

export default busReducer;