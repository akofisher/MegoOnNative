import {  SET_SEARCH, REMOVE_SEARCH, SET_SEARCH_PAGE, SET_SEARCH_RES, SET_SEARCH_OPEN } from './searchActions'

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    payload: search,
  }
}

export const setSearchPage = (searchPage) => {
  return {
    type: SET_SEARCH_PAGE,
    payload: searchPage,
  }
}

export const removeSearch = (UID) => {
  return {
    type: REMOVE_SEARCH,
    payload: UID,
  }
}

export const setSearchRes = (searchRes) => {
  return {
    type: SET_SEARCH_RES,
    payload: searchRes,
  }
}

export const setSearchOpen = (searchOpen) => {
  return {
    type: SET_SEARCH_OPEN,
    payload: searchOpen,
  }
}