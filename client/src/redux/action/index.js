import axios from "axios";

export const GET_USERS_EMAIL = "GET_USERS_EMAIL";
export const POST_USERS_SIGNIN = "POST_USERS_SIGNIN";
export const CLEAR_STATE_USER = "CLEAR_STATE_USER";
export const LOAD_STATE_USER = "LOAD_STATE_USER";
export const GET_ALL_CLUBES = "GET_ALL_CLUBES";
export const SET_USER = "SET_USER";
export const ORDER_NAME_CLUBS = "ORDER_NAME_CLUBS";
export const ORDER_PRICE_CLUBS = "ORDER_PRICE_CLUBS";
export const GET_CLUB_DETAIL = "GET_CLUB_DETAIL"


export const get_club_detail = (clubId) => async (dispatch) => {
  
  try {
    let club = await axios.get(`http://localhost:3001/club/${clubId}`)
    let bookings = await axios.get(`http://localhost:3001/booking/${clubId}`)
    let resData = bookings && bookings.length > 0 ? {...club.data, ...bookings.data} : {...club.data}
  
    return dispatch({type: GET_CLUB_DETAIL, payload: resData})
  
  } catch (error){ console.log(error)}

}

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
