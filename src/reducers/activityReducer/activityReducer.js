import{LIST_ACTIVITY_DUE,
    ACTIVITY_SELECT,
    SET_CARD_VIEW,
    SHOW_FAB,
    SELECT_SEL
} from '../../actions/types'

const initialState={
    listActivityDue: [],
    activitySel: null,

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
        
        case ACTIVITY_SELECT:
        return {
            ...state,
            activitySel:action.payload,
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

        default:
        return state
    }
}