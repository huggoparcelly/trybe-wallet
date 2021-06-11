// Coloque aqui suas actions
export const USER_ENTER = 'USER_ENTER';
export const REQUEST_API = 'REQUEST_API';
export const GET_COIN = 'GET_COIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const COUNT_EXPENSE = 'COUNT_EXPENSE';

export function userAction(email) {
  return {
    type: USER_ENTER,
    email,
  };
}

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const getCoin = (data) => ({
  type: GET_COIN,
  payload: {
    currencies: data,
  },
});

export const getExpense = (expenses, data) => ({
  type: ADD_EXPENSE,
  payload: {
    ...expenses,
    exchangeRates: data,
  },
});

export const getCount = () => ({
  type: COUNT_EXPENSE,
});

export function walletAction(expenses) {
  return (dispatch) => {
    dispatch(requestAPI());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => (r.json()))
      .then((json) => {
        dispatch(getExpense(expenses, json));
      });
  };
}

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getCoin(json)),
        ));
  };
}
