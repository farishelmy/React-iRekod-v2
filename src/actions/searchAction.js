import {BASIC_SEARCH,STAKEH_LIST,SEARCH_STATUS} from './types'
import {biorisUrl} from '../config/appConf'
import {converter} from '../utils/converter'


//Stakeh List
export const stakehList = (param) => dispatch =>{
    // console.log(param)
    const url=biorisUrl+converter(param)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{ 
            // console.log(res)
            dispatch({
                type:STAKEH_LIST,
                payload:res.data
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


//Search Status
export const searchStatus=(param)=>{
    return {
        type:SEARCH_STATUS,
        payload:param
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