import {SHOW_COMPLETE,SHOW_SUSPEND,SET_LOADER_TEXT,SHOW_FORM,SHOW_ERR} from '../../actions/types'

const initialState = {
  showComplete:false,
  showForm:false,
  showErr:false,
  showSuspend:false,
  loaderText:null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SHOW_COMPLETE:
    return {
        ...state,
        showComplete:action.payload
    }

  case SHOW_FORM:
    return {
        ...state,
        showForm:action.payload
    }

    case SHOW_ERR:
    return {
        ...state,
        showErr:action.payload
    }

    case SHOW_SUSPEND:
    return {
        ...state,
        showSuspend:action.payload
    }

    case SET_LOADER_TEXT:
    return {
        ...state,
        loaderText:action.payload
    }
  default:
    return state
  }
}
