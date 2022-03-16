import { GET_USERS } from "../action/index";
const initialState = {
  cancha: [],
  users: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS: {
      return {
        ...state,
        users: payload,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
