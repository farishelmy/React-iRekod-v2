import{
    LIST_ACTIVITY,
    LIST_ACTIVITY_DUE,
    SET_CARD_VIEW,
    SHOW_FAB,
    SELECT_SEL,
    WIZARD_PAGE,
    ACTIVITY_URI,
    ACTIVITY_NAME,
    ACTIVITY_DETAIL,
    SET_CONTAINER_LINE,
    SET_RECORD_STORE

} from '../../actions/types'

const initialState={
    listActivity:[],
    listActivityDue: [],
    activityDet: null,
    activityUri: null,
    activityName: null,
    wizardPage:"general",
    recordStore:[],
    containerLine:true,
    cardView:true,
    showFab:null,
    isSel:false
    
  
}

export default function(state = initialState, action){
    switch(action.type){
        case LIST_ACTIVITY:
        return {
            ...state,
            listActivity:action.payload,
        }

        case LIST_ACTIVITY_DUE:
        return {
            ...state,
            listActivityDue:action.payload,
        }
        
        case ACTIVITY_DETAIL:
        return {
            ...state,
            activityDet:action.payload,
        }

        case ACTIVITY_URI:
        return {
            ...state,
            activityUri:action.payload,
        }

        case ACTIVITY_NAME:
        return {
            ...state,
            activityName:action.payload,
        }

        case SET_CARD_VIEW:
        return {
            ...state,
            cardView:action.payload,
        }

        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload,
        }

        case SELECT_SEL:
        return {
            ...state,
            isSel:action.payload
        }         
        
        case WIZARD_PAGE:
        return {
            ...state,
            wizardPage:action.payload,
        }

        case SET_CONTAINER_LINE:
        return { 
            ...state,
            containerLine:action.payload,
        } 

        case SET_RECORD_STORE:
        return { 
            ...state,
            recordStore:action.payload,
        } 

        default:
        return state
    }
}