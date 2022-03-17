import { GET_USERS_EMAIL, POST_USERS_SIGNIN } from "../action/index";
const initialState = {
  cancha: [],
  users: {},
  usersignin: {},
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS_EMAIL: {
      return {
        ...state,
        users: payload /* [{msg:sadasd}] */,
      };
    }
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
