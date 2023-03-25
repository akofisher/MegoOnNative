import {  SET_ORDERS, SET_LAST_ORDER } from './OrdersAction.js'

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  }
}

export const setLastOrder = (lastOrder) => {
  return {
    type: SET_LAST_ORDER,
    payload: lastOrder,
  }
}