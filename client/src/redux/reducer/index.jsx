import {
  POST_USERS_SIGNIN,
  GET_USERS_EMAIL,
  CLEAR_STATE_USER,
  LOAD_STATE_USER,
  GET_ALL_CLUBES,
  SET_USER,
  ORDER_NAME_CLUBS,
  ORDER_PRICE_CLUBS,
  GET_CLUB_DETAIL,
  CLEAN_STATE,
  LOCATION_FILTER,
  GET_ALL_USER,
  DELETE_USER,
  UPDATE_USER,
} from "../action/index";
import { order } from "./metodos/order";
const initialState = {
  clubes: [],
  cancha: [],
  usersignin: [],
  user: {},
  deleteUser: [],
  updateUser: [],
  allUsers: [],
  usersConect: [],
  clubDetail: {},
  clubCopia: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CLUB_DETAIL: {
      return {
        ...state,
        clubDetail: payload,
      };
    }

    case GET_ALL_CLUBES: {
      return {
        ...state,
        clubes: payload,
        clubCopia: payload,
      };
    }

    case GET_ALL_USER: {
      let filtrado = payload.filter((u) => u.id !== state.user.id);
      return {
        ...state,
        allUsers: filtrado,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        deleteUser: payload,
      };
    }

    case UPDATE_USER: {
      return {
        ...state,
        updateUser: payload,
      };
    }

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

    case CLEAN_STATE: {
      return {
        ...state,
        user: payload,
      };
    }

    case LOCATION_FILTER: {
      const club = state.clubCopia;
      let meta = club.filter((e) => e.ciudad === payload);
      return {
        ...state,
        clubes: payload === "All" ? state.clubCopia : meta,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
