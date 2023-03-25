import { SET_ADDRESS, REMOVE_ADDRESS, SET_ADDRESS_MOD, SET_ADDRESS_MAP, SET_SELF_TAKING, SET_DEF_ADDRESS } from './AddressActions.js'

const initialState = {
  address: [],
  addressMod: {
    editable: false,
    item: '',
    open: false,
  },
  addressMap: {
    choosen: false,
    fullAdr: '',
    lat: '',
    lng: '',
  },
  selfTaking: {
    self: 0
  },
  DefAddress: {
    DefUID: '',
  }
}

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
      break;

      case SET_DEF_ADDRESS:
      return {
        ...state,
        DefAddress: action.payload,
      }
      break;

      case SET_SELF_TAKING:
      return {
        ...state,
        selfTaking: action.payload,
      }
      break;

      case REMOVE_ADDRESS:
      return {
        ...state,
        address: state.address.filter(
          (inAddress) => inAddress.UID !== action.payload,
        ),
      }
      break;

      case SET_ADDRESS_MOD:
      return {
        ...state,
        addressMod: action.payload,
      }
      break;

      case SET_ADDRESS_MAP:
      return {
        ...state,
        addressMap: action.payload,
      }
      break;


    default:
      return state
  }
}