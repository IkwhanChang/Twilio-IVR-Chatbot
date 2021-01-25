import axios from "axios";
import * as actionTypes from "./types";

import jwt from "jsonwebtoken";
import { setHeaders } from "../utils/ajax.js"

/* User Actions */
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const getUser = async email => {

  try{
    const response = await axios.get("/api/merchant")

    if(response.data){

      return {
        type: actionTypes.GET_USER,
        payload: {
          currentUser: response.data
        }
      };
    }
  }catch(e){
    console.error(e);
    throw e;
  }

};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

export const login = async (values) => {
  
  try{
    const response = await axios.post("/login", values)

    if(response.data && response.data.success){
      const token = response.data.token;
      const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME

      localStorage[TOKEN_NAME] = token;

      // Decode token and get user info and exp

      var decoded = jwt.verify(token.split(" ")[1], process.env.REACT_APP_SECRET);

      // Set default header
      setHeaders(token);
      console.log(decoded)
      
      return getUser(decoded)
    }
  }catch(e){
    console.error(e)
    //throw e;
    return {
      type: actionTypes.CLEAR_USER
    };
  }
  
};

/* Channel Actions */
export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  };
};

export const setPrivateChannel = isPrivateChannel => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel
    }
  };
};

export const setUserPosts = userPosts => {
  return {
    type: actionTypes.SET_USER_POSTS,
    payload: {
      userPosts
    }
  };
};

/* Colors Actions */
export const setColors = (primaryColor, secondaryColor) => {
  return {
    type: actionTypes.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  };
};
