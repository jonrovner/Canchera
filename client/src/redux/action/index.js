import axios from "axios";
import { usuarios } from "./data";

export const GET_USERS = "GET_USERS";
export const POST_USERS = "POST_USERS";

export const get_users = () => async (dispatch) => {
  try {
    let user = await axios.get(usuarios);
    return dispatch({
      type: GET_USERS,
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const post_users = (data) => async (dispatch) => {
  console.log("Data enviada:", data);
  try {
    await axios.post("http://localhost:3001/signup/owner", data);
  } catch (e) {
    console.log(e);
  }
};
