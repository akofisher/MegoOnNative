import {  SET_CHECKOUT_LOAD, SET_PAYMENT } from './CheckoutAction.js'

const initialState = {
  payment: {
   Checked: false,
   Payment: '',
  },
  checkLoad: false,
  
}

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      }
      break;

      case SET_CHECKOUT_LOAD:
      return {
        ...state,
        checkLoad: action.payload,
      }
      break;

    default:
      return state
  }
}