// Coloque aqui suas actions
export const USER_ENTER = 'USER_ENTER';
export const REQUES_API = 'REQUES_API';
export const GET_COIN = 'GET_COIN';

export function userAction(email) {
  return {
    type: USER_ENTER,
    email,
  };
}

export const requestAPI = () => ({ type: REQUES_API });
export const getCoin = (data) => ({ type: GET_COIN, data });

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
