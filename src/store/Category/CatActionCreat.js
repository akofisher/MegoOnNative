import { SET_CATEGORY } from './CatActions'

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  }
}