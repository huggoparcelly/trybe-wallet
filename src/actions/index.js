// Coloque aqui suas actions
export const USER_ENTER = 'USER_ENTER';

export function userAction(email) {
  return {
    type: USER_ENTER,
    email,
  };
}
