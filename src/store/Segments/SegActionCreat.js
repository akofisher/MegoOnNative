import { SET_SEGMENTS, SET_SEGMENTS_UID, SET_CHILD_SEG, SET_DOWN_CHILD_SEG } from './SegActions'

export const setSegments = (segments) => {
  return {
    type: SET_SEGMENTS,
    payload: segments,
  }
}

export const setSegmentsUID = (segmentsUID) => {
  return {
    type: SET_SEGMENTS_UID,
    payload: segmentsUID,
  }
}

export const setChildSeg = (childSeg) => {
  return {
    type: SET_CHILD_SEG,
    payload: childSeg,
  }
}

export const setDownChildSeg = (downChildSeg) => {
  return {
    type: SET_DOWN_CHILD_SEG,
    payload: downChildSeg,
  }
}