import {
    HOTELS_LIST,
    HOTELS_DELETE,
    HOTELS_PICS,
    HOTELS_ADD,
  } from "../actions/actionTypes";
  
  const initialState = {
    hotels: [],
    loading: false,
    error: null,
    hotelsPics: [],
  };
  
  export default function reducerHotelsList(state = initialState, action) {
    // console.log("reducer HOTELS", action);
    switch (action.type) {
      case HOTELS_LIST:
        // console.log('REDUCER HOTELS LIST', action.payload);
        return {
          ...state,
          hotels: action.payload,
          loading: false,
          error: null,
        };
      case HOTELS_ADD:
        // console.log('REDUCER HOTELS ADD', action.payload);
        return {
          ...state,
          // hotels: action.payload,
          loading: false,
          error: null,
        };
      case HOTELS_DELETE:
        const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
        // console.log('action.payload', action.payload);
        return {
          ...state,
          hotels: tempHOTELS,
          loading: false,
          error: null,
        };
      case HOTELS_PICS:
        //const tempHOTELS = state.hotels.filter((i) => i._id !== action.payload);
        console.log("HOTES-PICS reduser action.payload", action.payload);
        return {
          ...state,
          hotelsPics: action.payload,
          loading: false,
          error: null,
        };
      default:
        // console.log("reducer HOTELS default");
        return state;
    }
  }