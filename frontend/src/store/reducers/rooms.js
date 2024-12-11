import {
    ROOMS_LIST,
    ROOMS_DELETE,
    ROOMS_PICS,
    ROOMS_ADD,
  } from "../actions/actionTypes";
  
  const initialState = {
    rooms: [],
    loading: false,
    error: null,
    roomsPics: [],
  };
  
  export default function reducerRooms(state = initialState, action) {
    // console.log("reducer HOTELS", action);
    switch (action.type) {
      case ROOMS_LIST:
        // console.log('REDUCER USER LIST', action.payload);
        return {
          ...state,
          rooms: action.payload,
          loading: false,
          error: null,
        };
      case ROOMS_ADD:
        // console.log('REDUCER HOTELS ADD', action.payload);
        return {
          ...state,
          // hotels: action.payload,
          loading: false,
          error: null,
        };
      case ROOMS_DELETE:
        const tempRooms = state.hotels.filter((i) => i._id !== action.payload);
        // console.log('action.payload', action.payload);
        return {
          ...state,
          rooms: tempRooms,
          loading: false,
          error: null,
        };
      case ROOMS_PICS:
        //const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
        // console.log('HOTES-PICS action.payload', action.payload);
        return {
          ...state,
          roomsPics: action.payload,
          loading: false,
          error: null,
        };
      default:
        // console.log("reducer HOTELS default");
        return state;
    }
  }