import { POST_USERS_SIGNIN } from "../action/index";
const initialState = {
  cancha: [],
  usersignin: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case POST_USERS_SIGNIN: {
      return {
        ...state,
        usersignin: payload,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
