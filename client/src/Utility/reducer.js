import { Type } from "./actionType";

const initial = { user: null, token: null };

function reducer(state, action) {
  switch (action.type) {
    case Type.ADD_USER:
      return {
        ...state,
        user: action.payload.user, // Save the username
        token: action.payload.token, // Save the token
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
