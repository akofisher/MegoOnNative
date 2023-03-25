import { SET_SEGMENTS, SET_SEGMENTS_UID, SET_CHILD_SEG, SET_DOWN_CHILD_SEG } from './SegActions'

const initialState = {
  segments: [],
  segmentsUID: '',
  childSeg: [],
  downChildSeg: [],
}

export default function segmentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEGMENTS:
      return {
        ...state,
        segments: action.payload,
      }

    case SET_SEGMENTS_UID:
    return {
      ...state,
      segmentsUID: action.payload,
    }

    case SET_CHILD_SEG:
    return {
      ...state,
      childSeg: action.payload,
    }

    case SET_DOWN_CHILD_SEG:
    return {
      ...state,
      downChildSeg: action.payload,
    }

    default:
      return state
  }
}