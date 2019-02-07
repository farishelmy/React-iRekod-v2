import {BASIC_SEARCH,STAKEH_LIST} from '../actions/types'


const initialState={
    stakehList:[],
    basicKey:null,


}

export default function(state = initialState, action){
    switch(action.type){
        case STAKEH_LIST:
        return {...state,
            stakehList:action.payload,
        }
        case BASIC_SEARCH:
        return {...state,
            basicKey:action.payload,
        }       
        default:
        return state
    }
}