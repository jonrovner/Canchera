import axios from "axios";

export const GET_USERS_EMAIL = "GET_USERS_EMAIL";
export const POST_USERS_SIGNIN = "POST_USERS_SIGNIN";
export const CLEAR_STATE_USER = "CLEAR_STATE_USER";
export const LOAD_STATE_USER = "LOAD_STATE_USER";

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
