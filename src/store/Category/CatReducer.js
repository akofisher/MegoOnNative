import { SET_CATEGORY } from './CatActions'

const initialState = {
  category: [],
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }

    default:
      return state
  }
}