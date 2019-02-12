import {STAKEH_TYPE,STAKEH_SEL,STAKEH_SEL_OBJ,STAKEH_VIEW,SHOW_FAB,STAKEH_LABEL,STAKEH_NUMB} from '../../actions/types'


const initialState={ 
    stakehType:[],  //List Type Stakeholder
    stakehSel:'null',   //Select Stakeholder    
    stakehObj:'null',    
    stakehView: false, //layout card to grid
    showFab:false,  //Fab
    stakehLabel: null, //Stakeh Label
    stakehNumb: null, //Stakeh Number Type  
      

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
        default:
        return state
    }
}