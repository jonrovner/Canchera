import {
  POST_USERS_SIGNIN,
  GET_USERS_EMAIL,
  CLEAR_STATE_USER,
  LOAD_STATE_USER,
  GET_ALL_CLUBES,
  SET_USER,
  ORDER_NAME_CLUBS,
  ORDER_PRICE_CLUBS,
} from "../action/index";
import { order } from "./metodos/order";
const initialState = {
  clubes: [],
  cancha: [],
  usersignin: [],
  user: [],
  usersConect: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CLUBES: {
      return {
        ...state,
        clubes: payload,
      };
    }
    case POST_USERS_SIGNIN: {
      return {
        ...state,
        usersignin: payload,
      };
    }
    case GET_USERS_EMAIL: {
      console.log("updating user");
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
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    case ORDER_NAME_CLUBS: {
      let ordered = order(state.clubes, payload);
      return {
        ...state,
        clubes: ordered,
      };
    }

    case ORDER_PRICE_CLUBS: {
      let ordered = order(state.clubes, payload);
      return {
        ...state,
        clubes: ordered,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
