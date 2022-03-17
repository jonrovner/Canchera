import axios from "axios";

/* export const GET_USERS_EMAIL = "GET_USERS_EMAIL"; */
export const POST_USERS_SIGNIN = "POST_USERS_SIGNIN";

/* export const get_users_email = (email) => async (dispatch) => {
  try {
    let user = await axios.get(`http://localhost:3001/user?email=${email}`);
    return dispatch({ type: GET_USERS_EMAIL, payload: user.data });
  } catch (error) {
    console.log(error);
  }
}; */

export const post_users_signin = (data) => async (dispatch) => {
  try {
    let user = await axios.post(`http://localhost:3001/signin`, data);
    return dispatch({ type: POST_USERS_SIGNIN, payload: user.data });
  } catch (error) {
    console.log(error);
  }
};

export const post_users_owner = (data) => async (dispatch) => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/owner", data);
  } catch (e) {
    console.log(e);
  }
};

export const post_users = (data) => async (dispatch) => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/user", data);
  } catch (e) {
    console.log(e);
  }
};
