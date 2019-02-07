import {ADD_STAKEH,BASIC_DET} from '../../actions/types'


const initialState = {
    stakehId:null,
    basicDet:[],
     
 
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_STAKEH:
    return { ...state,
      stakehId:action.payload,
    } 
    case BASIC_DET:
    return { ...state,
      basicDet:action.payload,
    }      
    default:
    return state
  }
}
