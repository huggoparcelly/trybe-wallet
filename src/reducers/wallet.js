// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUES_API, GET_COIN } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoadind: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUES_API:
    return {
      ...state,
      isLoadind: true,
    };
  case GET_COIN:
    return {
      ...state,
      currencies: Object.entries(action.data).filter((coin) => coin[0] !== 'USDT'),
      isLoadind: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
