import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY,SELECTED_RECIPIENTS, LIST_EMAIL_RECIPIENTS, SELECTED_INC_STAKEH, VIEW_RECIPIENTS} from '../types'

import {biorisUrl} from '../../config/appConf'

export const updateActivity = (param) => dispatch =>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'POST'})
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            dispatch({
                type:UPDATE_ACTIVITY,
                payload:param
            })
        })
}

export const setActivityDetailsUpdate=(det)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(det)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res)
        dispatch({
            type: LIST_UPDATE_ACTIVITY,
            payload: det
        })
    })

}

export const setIncStakeh=(param)=>{
    return {
        type:SELECTED_INC_STAKEH,
        payload:param
    }
}

export const setRecipients=(param)=>{
    return {
        type:SELECTED_RECIPIENTS,
        payload:param
    }
}

export const taskEmailRecipients=(param)=>{
    return {
        type:LIST_EMAIL_RECIPIENTS,
        payload:param
    }
}






