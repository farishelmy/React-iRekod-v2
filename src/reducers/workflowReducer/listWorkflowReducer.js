import{LIST_WORKFLOW,
    LIST_OF_SUBJECT, 
    LIST_OF_CHILDSUBJECT, 
    SET_CARD_VIEW,  
    CHANGE_ISMULTI,
    WORKFLOW_SEL,
    SHOW_FAB, 
    LIST_ACTIVITY_DETAIL,
    STAKEHOLDER_LIST,
    SELECT_SEL} from '../../actions/types'

const initialState={
    listWrkFlwObj : [],
    listofSubjectObj : [],
    listSub:[],
    cardView:true,
    isMultiSel:false,
    isSelAll:false,
    wrkflSel:null, //when cell select
    showFab:false, //show floating button
    selDetails: [],
    stakehList:[],
    isSel:false
  
}

export default function(state = initialState, action){
    switch(action.type){
        case LIST_WORKFLOW:
        return {
            ...state,
            listWrkFlwObj:action.payload,
        }

        case LIST_OF_SUBJECT:
        return {
            ...state,
            listofSubjectObj:action.payload,
        }

        case LIST_OF_CHILDSUBJECT:
        return {
            ...state,
            listSub:action.payload,
        }

        case SET_CARD_VIEW:
        return {
            ...state,
            cardView:action.payload
        }
        case CHANGE_ISMULTI:
        return {
            ...state,
            isMultiSel:action.payload
        }
        case WORKFLOW_SEL:
        return {
            ...state,
            wrkflSel:action.payload
        } 
        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload
        } 
        case LIST_ACTIVITY_DETAIL:
        return {
            ...state,
            selDetails:action.payload
        } 
        case STAKEHOLDER_LIST:
        return {
            ...state,
            stakehList:action.payload
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