import {BASIC_SEARCH,STAKEH_LIST,SEARCH_STATUS} from '../actions/types'


const initialState={
    stakehList:[],
    basicKey:null,
    searchStatus:false,


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
        case SEARCH_STATUS:
        return {...state,
            searchStatus:action.payload,
        }       
        default:
        return state
    }
}