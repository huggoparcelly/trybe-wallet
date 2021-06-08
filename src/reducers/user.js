// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_ENTER } from '../actions';

const INITIAL_STATE = {};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_ENTER:
    return action.email;
  default:
    return state;
  }
}

export default userReducer;
