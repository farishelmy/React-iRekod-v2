import{PAGE_CLASS,TOGGLE_SIDENAV,SIDENAV_CLASS,ACTIVE_PAGE, PAGE_TITLE, PAGE_SUBJECT} from '../actions/types'

const initialState={
    pageClass:'page',
    activePage:'dashboard',
    toggleSideNav:false,
    navBarClass:'side-navbar',
    pageTitle:'null',
    pageView:false,
    pageSubject:''
}

export default function(state = initialState, action){
    switch(action.type){
        case PAGE_CLASS:
        return {
            ...state,
            pageClass:action.payload,
        }
        case TOGGLE_SIDENAV:
        return {
            ...state,
            toggleSideNav:action.payload
        }
        case SIDENAV_CLASS:
        return {
            ...state,
            navBarClass:action.payload
        }
        case ACTIVE_PAGE:
        return {
            ...state,
            activePage:action.payload
        }
        case PAGE_TITLE:
        return {
            ...state,
            pageTitle:action.payload
        }   
        
        case PAGE_SUBJECT:
        return { 
            ...state,
            pageSubject:action.payload,
        } 

        default:
        return state
    }
}