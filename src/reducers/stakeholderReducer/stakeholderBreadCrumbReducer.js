import {BC_INDEX,BC_DETAIL,BC_UPDATE} from '../../actions/types'


const initialState={ 
    bcIndex: false,
    bcDet:false,   
    bcUpd:false,    
    
      

}

export default function(state = initialState, action){
    switch(action.type){
        case BC_DETAIL:
        return {
            ...state,
            bcDet:action.payload,
        }    
        case BC_UPDATE:
        return {
            ...state,
            bcUpd:action.payload
        }   
        case BC_INDEX:
        return {
            ...state,
            bcIndex:action.payload
        }       
        default:
        return state
    }
}