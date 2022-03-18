import {
  POST_USERS_SIGNIN,
  GET_USERS_EMAIL,
  CLEAR_STATE_USER,
  LOAD_STATE_USER,
} from "../action/index";
const initialState = {
  cancha: [],
  usersignin: [],
  user: [],
  usersConect: [],
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
    case LOAD_STATE_USER: {
      return {
        ...state,
        usersConect: [...state.usersConect, payload],
      };
    }
    case CLEAR_STATE_USER: {
      /*   let filtrados = state.usersConect.filter((u) => u.email !== payload); */

      return {
        ...state,
        user: [],
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
