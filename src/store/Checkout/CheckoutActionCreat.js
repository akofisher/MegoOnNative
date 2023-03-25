import {  SET_CHECKOUT_LOAD, SET_PAYMENT } from './CheckoutAction.js'

export const setPayment = (payment) => {
  return {
    type: SET_PAYMENT,
    payload: payment,
  }
}

export const setCheckouLoad = (checkLoad) => {
  return {
    type: SET_CHECKOUT_LOAD,
    payload: checkLoad,
  }
}