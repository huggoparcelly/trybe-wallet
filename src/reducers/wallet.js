// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, GET_COIN, ADD_EXPENSE, COUNT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  count: 0,
  isLoadind: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoadind: true,
    };
  case GET_COIN:
    return {
      ...state,
      currencies: action.payload.currencies,
      isLoadind: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload],
      isLoadind: false,
    };
  case COUNT_EXPENSE:
    return {
      ...state,
      // count,
    };
  default:
    return state;
  }
}

export default walletReducer;
