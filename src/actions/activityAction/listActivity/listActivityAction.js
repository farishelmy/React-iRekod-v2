import {LIST_ACTIVITY_DUE,
    ACTIVITY_DETAIL,
    ACTIVITY_URI,
    ACTIVITY_NAME,
    SET_CARD_VIEW,
    SHOW_FAB,
    WIZARD_PAGE,
    SHOW_ERR
} from '../../types'
    
import {biorisUrl} from '../../../config/appConf'
import {converter} from '../../../utils/converter'

//List Option Workflow
export const setListActDue=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_ACTIVITY_DUE,
            payload: res.data
        })
    })

}


//Get Detail of Activity
export const getDetails=(param)=>{
    return {
        type:ACTIVITY_DETAIL,
        payload:param
    }

}

//Set Activity URI
export const activityUri=(param)=>{
    return {
        type:ACTIVITY_URI,
        payload:param
    }
}

//Set Activity Name
export const activityName=(param)=>{
    return {
        type:ACTIVITY_NAME,
        payload:param
    }
}

//Set Card View
export const setCardView=(cardStatus)=>{
    // console.log(cardStatus)
   return {
       type:SET_CARD_VIEW,
       payload:cardStatus
   }
}

//FAB
export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Set Wizard Page Name
export const setWizardPage=(param)=>{
    return {
        type:WIZARD_PAGE,
        payload:param
    }
}
 

