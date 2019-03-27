import {STAKEH_TYPE,STAKEH_SEL,STAKEH_SEL_OBJ,STAKEH_VIEW,SHOW_FAB,STAKEH_LABEL,STAKEH_NUMB,PAGE_SIZE_LOCATION,TOTAL_COUNT_LOCATION} from '../../actions/types'


const initialState={ 
    stakehType:[],  //List Type Stakeholder
    stakehSel:'null',   //Select Stakeholder    
    stakehObj:'null',    
    stakehView: false, //layout card to grid
    showFab:false,  //Fab
    stakehLabel: null, //Stakeh Label
    stakehNumb: null, //Stakeh Number Type  
    pageSize: 10,
    totalCount: null
      

}

export default function(state = initialState, action){
    switch(action.type){
        case STAKEH_TYPE:
        return {
            ...state,
            stakehType:action.payload,
        }    
        case STAKEH_SEL:
        return {
            ...state,
            stakehSel:action.payload
        } 
        case STAKEH_SEL_OBJ:
        return {
            ...state,
            stakehObj:action.payload
        }         
        case STAKEH_VIEW:
        return {
            ...state,
            stakehView:action.payload
        } 
        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload
        } 
        case STAKEH_LABEL:
        return {
            ...state,
            stakehLabel:action.payload
        }    
        case STAKEH_NUMB:
        return {
            ...state,
            stakehNumb:action.payload
        }    
        case PAGE_SIZE_LOCATION:
        return {
            ...state,
            pageSize:action.payload
        } 
        case TOTAL_COUNT_LOCATION:
        return {
            ...state,
            totalCount:action.payload
        }            
        default:
        return state
    }
}