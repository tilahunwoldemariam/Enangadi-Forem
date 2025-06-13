import { Type } from "./actionType";

const initial = { user: JSON.parse(localStorage.getItem('user')) || null, token: localStorage.getItem('token') || null };

function reducer(state, action) {
  switch (action.type) {
    case Type.ADD_USER:
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')) || action.payload.user, // Save the username
        token: localStorage.getItem('token') || action.payload.token, // Save the token
      };

    case Type.REMOVE_USER:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export { initial, reducer };
