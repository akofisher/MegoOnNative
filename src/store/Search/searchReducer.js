import {  SET_SEARCH, REMOVE_SEARCH, SET_SEARCH_PAGE, SET_SEARCH_RES, SET_SEARCH_OPEN } from './searchActions'

const initialState = {
  search: [],
  searchPage: [],
  searchOpen: false,
  searchRes: '',
}

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
      break;

    case SET_SEARCH_PAGE:
      return {
        ...state,
        searchPage: action.payload,
      }
      break;

    case REMOVE_SEARCH:
      return {
        ...state,
        search: state.search.filter(
          (inSearch) => inSearch.UID !== action.payload,
        ),
      }
      break;

      case SET_SEARCH_RES:
      return {
        ...state,
        searchRes: action.payload,
      }
      break;

      case SET_SEARCH_OPEN:
      return {
        ...state,
        searchOpen: action.payload,
      }
      break;
      

    default:
      return state
  }
}