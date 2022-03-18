import { POST_USERS_SIGNIN, GET_USERS_EMAIL } from "../action/index";
const initialState = {
  cancha: [],
  usersignin: [],
  user: {},
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case POST_USERS_SIGNIN: {
      return {
        ...state,
        usersignin: payload,
      };
    }
    case GET_USERS_EMAIL: {
      return {
        ...state,
        user: payload,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
