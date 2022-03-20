import axios from "axios";

export const GET_USERS_EMAIL = "GET_USERS_EMAIL";
export const POST_USERS_SIGNIN = "POST_USERS_SIGNIN";
export const CLEAR_STATE_USER = "CLEAR_STATE_USER";
export const LOAD_STATE_USER = "LOAD_STATE_USER";
export const GET_ALL_CLUBES = "GET_ALL_CLUBES";
export const SET_USER = "SET_USER";
export const ORDER_CLUBS = "ORDER_CLUBS";

export const get_all_clubes = () => async (dispatch) => {
  try {
    let clubes = await axios.get(`http://localhost:3001/club`);
    console.log(clubes.data);
    return dispatch({ type: GET_ALL_CLUBES, payload: clubes.data });
  } catch (error) {
    console.log(error);
  }
};

export const get_users_email = (email) => async (dispatch) => {
  try {
    let user = await axios.get(`http://localhost:3001/user?email=${email}`);
    return dispatch({ type: GET_USERS_EMAIL, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const post_users_signin = (data) => async (dispatch) => {
  try {
    let user = await axios.post(`http://localhost:3001/signin`, data);
    return dispatch({ type: POST_USERS_SIGNIN, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const post_users_owner = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/owner", data);
  } catch (e) {
    console.log(e);
  }
};

export const post_users = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/user", data);
  } catch (e) {
    console.log(e);
  }
};

export const post_users_google = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/singup/google", data);
  } catch (e) {
    console.log(e);
  }
};

export const clear_state_user = (email) => async (dispatch) => {
  return dispatch({ type: CLEAR_STATE_USER, payload: email });
};

export const load_state_user = (user) => async (dispatch) => {
  console.log(user);
  return dispatch({ type: LOAD_STATE_USER, payload: user });
};

export const set_user = (user) => async (dispatch) => {
  return dispatch({ type: SET_USER, payload: user });
};

export const order_clubs = (order) => {
  return { type: ORDER_CLUBS, payload: order };
};
