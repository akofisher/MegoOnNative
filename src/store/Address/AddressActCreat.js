import { SET_ADDRESS, REMOVE_ADDRESS, SET_ADDRESS_MOD, SET_ADDRESS_MAP, SET_SELF_TAKING, SET_DEF_ADDRESS } from './AddressActions.js'

export const setAddress = (address) => {
  return {
    type: SET_ADDRESS,
    payload: address,
  }
}

export const removeAddress = (UID) => {
  return {
    type: REMOVE_ADDRESS,
    payload: UID,
  }
}

export const setAddressMod = (addressMod) => {
  return {
    type: SET_ADDRESS_MOD,
    payload: addressMod,
  }
}

export const setAddressMap = (addressMap) => {
  return {
    type: SET_ADDRESS_MAP,
    payload: addressMap,
  }
}

export const setSelfTaking = (selfTaking) => {
  return {
    type: SET_SELF_TAKING,
    payload: selfTaking,
  }
}

export const setDefAddress = (DefAddress) => {
  return {
    type: SET_DEF_ADDRESS,
    payload: DefAddress,
  }
}