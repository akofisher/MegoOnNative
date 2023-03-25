
import { SET_LOGEDIN, SET_LOADING, SET_LOAD_CART_SUM, SET_CART_TOTAL_LOAD, SET_SPECS_LOAD, SET_BEER_LOAD, SET_WISH_LOAD, SET_ADR_LOAD, SET_LOAD_SCREEN  } from './userActions'
  
  export const setLogedin = (Logedin) => {
    return {
      type: SET_LOGEDIN,
      payload: Logedin,
    }
  }

  export const setLoading = (Loading) => {
    return {
      type: SET_LOADING,
      payload: Loading,
    }
  }
  
  export const setLoadCartSum = (cartSum) => {
    return {
      type: SET_LOAD_CART_SUM,
      payload: cartSum,
    }
  }

  export const setCartTotalLoad = (totalLoad) => {
    return {
      type: SET_CART_TOTAL_LOAD,
      payload: totalLoad,
    }
  }

  export const setSpecsLoad = (specsLoad) => {
    return {
      type: SET_SPECS_LOAD,
      payload: specsLoad,
    }
  }

  export const setBeerLoad = (beerLoad) => {
    return {
      type: SET_BEER_LOAD,
      payload: beerLoad,
    }
  }

  export const setWishLoad = (wishLoad) => {
    return {
      type: SET_WISH_LOAD,
      payload: wishLoad,
    }
  }

  export const setAddressLoad = (adrLoad) => {
    return {
      type: SET_ADR_LOAD,
      payload: adrLoad,
    }
  }

  export const setLoaderScr = (loadScr) => {
    return {
      type: SET_LOAD_SCREEN,
      payload: loadScr,
    }
  }
 