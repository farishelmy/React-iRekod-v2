import {STAKEHOLDER_LIST} from '../../actions/types'


const initialState={ 
    stakehList:[], //Stakeholder List

}

export default function(state = initialState, action){
    switch(action.type){
        case STAKEHOLDER_LIST:
        return {
            ...state,
            stakehList:action.payload,
        }            
        default:
        return state
    }
}