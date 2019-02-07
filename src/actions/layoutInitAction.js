import {PAGE_CLASS,TOGGLE_SIDENAV,SIDENAV_CLASS,ACTIVE_PAGE,PAGE_TITLE,PAGE_SUBJECT} from './types'


export const setPageClass=(pageClass)=>{
   return {
       type:PAGE_CLASS,
       payload:pageClass
   }
}
export const setSideNavClass=(sideNavClass)=>{
    return {
        type:SIDENAV_CLASS,
        payload:sideNavClass
    }
 }
export const setNavToggle=(toggleVal, pageClass, navClass)=>dispatch=>{
    if(toggleVal){
        dispatch(setSideNavClass(navClass))
        dispatch(setPageClass(pageClass))
        dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
    }else{
        dispatch(setSideNavClass('side-navbar'))
        dispatch(setPageClass('page'))
        dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
    }
 }

//Set page active
export const setActivePage=(pageName)=>{ 
    return {
        type:ACTIVE_PAGE,
        payload:pageName
    }
}

//Set page title
export const setPageTitle=(pageTitle)=>{
    return {
        type:PAGE_TITLE,
        payload:pageTitle
    }
}

//Set Page Subject
export const setPageSubject=(pageSubject)=>{
    return {
        type:PAGE_SUBJECT,
        payload:pageSubject
    }
}
 
