import{LIST_ACTIVITY_DUE,
    SET_CARD_VIEW,
    SHOW_FAB,
    SELECT_SEL,
    WIZARD_PAGE,
    ACTIVITY_URI,
    ACTIVITY_NAME,
    ACTIVITY_DETAIL
} from '../../actions/types'

const initialState={
    listActivityDue: [],
    activityDet: null,
    activityUri: null,
    activityName: null,
    wizardPage:"general",
    cardView:true,
    showFab:null,
    isSel:false
    
  
}

export default function(state = initialState, action){
    switch(action.type){
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

        default:
        return state
    }
}