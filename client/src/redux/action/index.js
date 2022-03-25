import axios from "axios";

export const GET_USERS_EMAIL = "GET_USERS_EMAIL";
export const POST_USERS_SIGNIN = "POST_USERS_SIGNIN";
export const CLEAR_STATE_USER = "CLEAR_STATE_USER";
export const LOAD_STATE_USER = "LOAD_STATE_USER";
export const GET_ALL_CLUBES = "GET_ALL_CLUBES";
export const SET_USER = "SET_USER";
export const ORDER_NAME_CLUBS = "ORDER_NAME_CLUBS";
export const ORDER_PRICE_CLUBS = "ORDER_PRICE_CLUBS";
export const GET_CLUB_DETAIL = "GET_CLUB_DETAIL";

export const CLEAN_STATE = "CLEAN_STATE";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const GET_PASSWORD = "GET_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";


export const get_club_detail = (clubName) => async (dispatch) => {
  try {
    let club = await axios.get(`/club/${clubName}`);

    return dispatch({ type: GET_CLUB_DETAIL, payload: club.data });
  } catch (error) {
    console.log(error);
  }
};

export const get_all_clubes = () => async (dispatch) => {
  try {
    let clubes = await axios.get(`/club`);
    console.log(clubes.data);
    return dispatch({ type: GET_ALL_CLUBES, payload: clubes.data });
  } catch (error) {
    console.log(error);
  }
};

export const get_users_email = (email) => async (dispatch) => {
  try {
    let user = await axios.get(`/user?email=${email}`);
    return dispatch({ type: GET_USERS_EMAIL, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const post_users_signin = (data) => async (dispatch) => {
  try {
    let user = await axios.post(`/signin`, data);
    return dispatch({ type: POST_USERS_SIGNIN, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const post_users_owner = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("/signup/owner", data);
  } catch (e) {
    console.log(e);
  }
};

export const post_users = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("/signup/user", data);
  } catch (e) {
    console.log(e);
  }
};

export const post_users_google = (data) => async () => {
  console.log("Data enviada:", data);
  try {
    await axios.post("/signup/singup/google", data);
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

export const order_name_clubs = (order) => {
  return { type: ORDER_NAME_CLUBS, payload: order };
};

export const order_price_clubs = (order) => {
  return { type: ORDER_PRICE_CLUBS, payload: order };
};


export const clean_state = (payload) =>{
  return{ type: CLEAN_STATE, payload:{}}
}

export const passForgotten = (email) => async (dispatch) => {
  try {
    let validateEmail = await axios.post("/forgotpassword", email);
    dispatch({ type: FORGOT_PASSWORD, payload: validateEmail.data });
  } catch (error) {
    console.log(error);
  }
};
/* export const getPass = (token) => async (dispatch) => {
  try {
    let newPass = await axios.get(`/resetpassword/${token}`);
    dispatch({ type: RESET_PASSWORD, payload: newPass.data });
  } catch (error) {
    console.log(error);
  }
}; */


export const resetPass = (password) => async (dispatch) => {
  try {
    
    let newPass = await axios.put(`/resetpassword/`,password);
    dispatch({ type: RESET_PASSWORD, payload: newPass.data });
  } catch (error) {
    console.log(error);
  }
};

