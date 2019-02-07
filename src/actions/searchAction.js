import {BASIC_SEARCH,STAKEH_LIST} from './types'
import {biorisUrl} from '../config/appConf'


//Stakeh List
export const stakehList = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${encodeURIComponent(JSON.stringify(param))}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{ 
            // console.log(res)
            dispatch({
                type:STAKEH_LIST,payload:res.results
            })             
        })   
}

//Search Key
export const basicSearch=(searchKey)=>{
   return {
       type:BASIC_SEARCH,
       payload:searchKey
   }
}



 


// export const setSideNavClass=(sideNavClass)=>{
//     return {
//         type:SIDENAV_CLASS,
//         payload:sideNavClass
//     }
//  }
// export const setNavToggle=(toggleVal, pageClass, navClass)=>dispatch=>{
//     if(toggleVal){
//         dispatch(setSideNavClass(navClass))
//         dispatch(setPageClass(pageClass))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }else{
//         dispatch(setSideNavClass('side-navbar'))
//         dispatch(setPageClass('page'))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }
//  }
//  export const setActivePage=(pageName)=>{
//     return {
//         type:ACTIVE_PAGE,
//         payload:pageName
//     }
//  }