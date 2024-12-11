import {
    USER_TEST,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP,
    USERS_UPDATE,
    USERS_LIST,
    USERS_DELETE,
    HOTELS_LIST,
    HOTELS_DELETE,
    HOTELS_PICS,
    HOTELS_ADD,
    ROOMS_LIST,
    ROOMS_DELETE,
    ROOMS_PICS,
    ROOMS_ADD,
    REG_LIST,
    REG_ADD,
    REG_DELETE,
    REG_LOCAL_CLEAR,
    USER_ERROR,
    MGR_REG_LIST,
    MGR_REG_DELETE,
  } from "./actionTypes";
  
  export function actionUserTest(user) {
    // console.log('actionCreater param', user)
    return { type: USER_TEST, payload: { user } };
  }
  export function actUserLogin(payload) {
    // console.log('actionCreater payoad', payload)
    return { type: USER_LOGIN, payload: payload };
  }
  export function actUserLogout() {
    // console.log('actionCreater payoad', payload)
    return { type: USER_LOGOUT, payload: {} };
  }
  export function actUserError(payload) {
    // console.log('actionCreater payoad', payload)
    return { type: USER_ERROR, payload: payload };
  }
  
  // ========================================
  
  export function actUserSignup(payload) {
    // console.log('actionCreater SIGNUP payoad', payload)
    return { type: USER_SIGNUP, payload: payload };
  }
  export function actUsersList(payload) {
    // console.log('actionCreater USERSLIST payoad', payload)
    return { type: USERS_LIST, payload: payload };
  }
  export function actUsersDelete(id) {
    // console.log('actionCreater USERSDELETE id', id)
    return { type: USERS_DELETE, payload: id };
  }
  export function actUsersUpdate(payload) {
    // console.log('actionCreater USERS UPDATE id', payload)
    return { type: USERS_UPDATE, payload: payload };
  }
  
  // ========================================
  
  export function actHotelsList(payload) {
    // console.log('actionCreater HOTELSLIST payoad', payload)
    return { type: HOTELS_LIST, payload: payload };
  }
  export function actHotelsAdd(payload) {
    // console.log('actionCreater HOTELS-ADD payoad', payload)
    return { type: HOTELS_ADD, payload: payload };
  }
  export function actHotelsDelete(id) {
    // console.log('actionCreater HOTELSDELETE id', id)
    return { type: HOTELS_DELETE, payload: id };
  }
  export function actHotelsPics(arrPics) {
    // console.log('actionCreater HOTELS-PICS arrPics', arrPics)
    return { type: HOTELS_PICS, payload: arrPics };
  }
  
  export function actRoomsList(payload) {
    // console.log('actionCreater HOTELSLIST payoad', payload)
    return { type: ROOMS_LIST, payload: payload };
  }
  export function actRoomsAdd(payload) {
    // console.log('actionCreater HOTELS-ADD payoad', payload)
    return { type: ROOMS_ADD, payload: payload };
  }
  export function actRoomsDelete(id) {
    // console.log('actionCreater HOTELSDELETE id', id)
    return { type: ROOMS_DELETE, payload: id };
  }
  export function actRoomsPics(arrPics) {
    // console.log('actionCreater HOTELS-PICS arrPics', arrPics)
    return { type: ROOMS_PICS, payload: arrPics };
  }
  
  export function actRegRoomsList(payload) {
    // console.log('actionCreater REG_LIST payload', payload)
    return { type: REG_LIST, payload: payload };
  }
  export function actRegRoomsAdd(payload) {
    console.log("actionCreater REG_ADD payload", payload);
    return { type: REG_ADD, payload: payload };
  }
  export function actRegRoomsDelete(id) {
    console.log("actionCreater REG_DELETE id", id);
    return { type: REG_DELETE, payload: id };
  }
  export function actRegRoomsClear(id) {
    // console.log('actionCreater REG_DELETE id', id)
    return { type: REG_LOCAL_CLEAR, payload: id };
  }
  
  export function actMgrRegRoomsList(payload) {
    console.log("actionCreater ====  MGR_REG_LIST payload", payload);
    return { type: MGR_REG_LIST, payload: payload };
  }
  export function actMgrRegRoomsDelete(id) {
    console.log("actionCreater REG_DELETE id", id);
    return { type: MGR_REG_DELETE, payload: id };
  }
  
  