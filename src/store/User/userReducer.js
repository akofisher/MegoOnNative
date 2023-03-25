import { SET_LOADING, SET_LOGEDIN, SET_LOAD_CART_SUM, SET_CART_TOTAL_LOAD, SET_SPECS_LOAD, SET_BEER_LOAD, SET_WISH_LOAD, SET_ADR_LOAD,SET_LOAD_SCREEN } from './userActions';
  
  const initialState = {
    Logedin: {
        isLogedin: false,
    },
    Loading: true,
    cartSum: false,
    totalLoad: false,
    specsLoad: false,
    beerLoad: false,
    wishLoad: false,
    adrLoad: false,
    loadScr: false,
    
  }
  
  export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LOGEDIN:
        return {
          ...state,
          Logedin: action.payload,
        }
        break;

        case SET_LOADING:
        return {
          ...state,
          Loading: action.payload,
        }
        break;

        case SET_LOAD_CART_SUM:
          return {
            ...state,
            cartSum: action.payload,
          }
          break;

          case SET_CART_TOTAL_LOAD:
          return {
            ...state,
            totalLoad: action.payload,
          }
          break;

          case SET_SPECS_LOAD:
          return {
            ...state,
            specsLoad: action.payload,
          }
          break;

          case SET_BEER_LOAD:
          return {
            ...state,
            beerLoad: action.payload,
          }
          break;
       
          case SET_WISH_LOAD:
            return {
              ...state,
              wishLoad: action.payload,
            }
            break;

          case SET_ADR_LOAD:
            return {
              ...state,
              adrLoad: action.payload,
            }
            break;

          case SET_LOAD_SCREEN:
            return {
              ...state,
              loadScr: action.payload,
            }
            break;
      
      default:
        return state
    }
  }