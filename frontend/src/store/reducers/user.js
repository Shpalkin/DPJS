import {
    USER_LOGIN,
    USER_TEST,
    USER_LOGOUT,
    USER_SIGNUP,
    USER_ERROR,
  } from "../actions/actionTypes";
  
  const localUser = localStorage.getItem("user");
  let userLocalStorage = null;
  // console.log('987987987', localUser);
  if (!localUser) {
    console.log("REDUSER user undefined", userLocalStorage);
  } else {
    userLocalStorage = JSON.parse(localUser);
    // userLocalStorage = JSON.parse(localUser);
  }
  // const userLocalStorage = localUser !== undefined ? JSON.parse(localStorage.getItem("user")) : null;
  
  const initialState = userLocalStorage
    ? {
        user: userLocalStorage,
        userLoading: false,
        userError: null,
      }
    : {
        user: null,
        userLoading: false,
        userError: null,
      };
  
  export default function reducerUser(state = initialState, action) {
    // console.log('reducer USER');
    switch (action.type) {
      case USER_TEST:
        // const { user } = action.payload;
        // console.log('reducer USER case payload', action.payload);
        return { ...state };
  
      case USER_LOGIN:
        if (action.payload.user) {
          localStorage.setItem("token", action.payload.access_token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
  
          return {
            ...state,
            user: action.payload.user,
            userLoading: false,
            userError: null,
          };
        }
  
      case USER_LOGOUT:
        //
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("reservations");
        return { ...state, user: null };
  
      case USER_SIGNUP:
        if (action.payload.access_token) {
          // alert("Усешная регистрация пользователя");
          let userError = {
            type: "mess",
            text: "Усешная регистрация пользователя",
          };
          const user = localStorage.getItem("user");
          console.log("REDUSER USER ", user);
          return {
            ...state,
            // user: user ? user : null,
            userLoading: false,
            userError,
          };
        }
  
      case USER_ERROR:
        console.log("reducer USER_ERROR action.payload", action.payload);
        if (!action.payload.message) {
          return state;
        }
        let userError = {
          type: action.payload.statusCode > 399 ? "err" : "mess",
          text: `ERROR: ${action.payload.statusCode}. ${action.payload.message}`,
        };
        if (action.payload.message === "close") {
          userError = null;
        }
        return {
          ...state,
          // user: null,
          userLoading: false,
          userError,
        };
  
      default:
        // console.log("reducer USER default");
        return state;
    }
  }