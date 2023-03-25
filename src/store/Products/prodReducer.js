import { SET_PRODUCTS, SET_PRODUCTSBYCAT, SET_SINGLEPROD, SET_SAMEPROD, 
    SET_DRAFTBEER, SET_WISHPROD, REMOVE_WISHPROD, SET_CARDPROD, SET_CARD_COUNT } from './prodActions'
  
  const initialState = {
    products: [],
    productsByCat: [],
    singleProd: [],
    sameProd: [],
    draftBeer: [],
    wishProd: [],
    cart: [],
    cardCount: 0,
  }
  
  export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        }
        break;
        case SET_PRODUCTSBYCAT:
        return {
          ...state,
          productsByCat: action.payload,
        }
        break;
        case SET_CARDPROD:
        return {
          ...state,
          cart: action.payload,
        }
        break;
         case SET_SINGLEPROD:
        return {
          ...state,
          singleProd: action.payload,
        }
        break;
        case SET_SAMEPROD:
        return {
          ...state,
          sameProd: action.payload,
        }
        break;
        case SET_DRAFTBEER:
        return {
          ...state,
          draftBeer: action.payload,
        }
        break;
        case SET_WISHPROD:
        return {
          ...state,
          wishProd: action.payload,
        }
        break;
        case REMOVE_WISHPROD:
        return {
          ...state,
          wishProd: state.wishProd.filter(
            (inWish) => inWish.UID !== action.payload,
          ),
        }
        break;
        case SET_CARD_COUNT:
        return {
          ...state,
          cardCount: action.payload,
        }
        break;
      default:
        return state
    }
  }