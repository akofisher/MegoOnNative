import {  SET_ORDERS, SET_LAST_ORDER } from './OrdersAction.js'

const initialState = {
  orders: [],
  lastOrder: [],
  
}

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
      break;

    case SET_LAST_ORDER:
      return {
        ...state,
        lastOrder: action.payload,
      }
      break;

    default:
      return state
  }
}