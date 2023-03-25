import { SET_PRODUCTS, SET_PRODUCTSBYCAT, SET_SINGLEPROD, SET_SAMEPROD, 
    SET_DRAFTBEER, SET_WISHPROD, REMOVE_WISHPROD, SET_CARDPROD, SET_CARD_COUNT } from './prodActions'
  
  export const setProducts = (products) => {
    return {
      type: SET_PRODUCTS,
      payload: products,
    }
  }
  
  export const setCartProd = (cart) => {
    return {
      type: SET_CARDPROD,
      payload: cart,
    }
  }
  
  export const setProductsByCat = (productsByCat) => {
    return {
      type: SET_PRODUCTSBYCAT,
      payload: productsByCat,
    }
  }
  
  export const setSingleProd = (singleProd) => {
    return {
      type: SET_SINGLEPROD,
      payload: singleProd,
    }
  }
  
  export const setSameProd = (sameProd) => {
    return {
      type: SET_SAMEPROD,
      payload: sameProd,
    }
  }
  
  
  export const setDraftBeer = (draftBeer) => {
    return {
      type: SET_DRAFTBEER,
      payload: draftBeer,
    }
  }
  
  
  export const setWishProd = (wishProd) => {
    return {
      type: SET_WISHPROD,
      payload: wishProd,
    }
  }
  
  export const removeWishItem = (UID) => {
    return {
      type: REMOVE_WISHPROD,
      payload: UID,
    }
  }

  export const setCardCount = (cardCount) => {
    return {
      type: SET_CARD_COUNT,
      payload: cardCount,
    }
  }