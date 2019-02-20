import {WIZARD_PAGE_ADD, SET_CONTAINER_LINE_ADD, LIST_WORKFLOWBY_SUBJECT, LIST_EMAIL_ADD, LIST_ADD_TASK_NEW, ADD_NEW_ACTIVITY, RES_DETAILS} from '../types'

import {biorisUrl} from '../../config/appConf'


export const setWizardPageNew=(param)=>{
    return {
        type:WIZARD_PAGE_ADD,
        payload:param
    }
}

export const setContinerLineNew=(param)=>{
    return {
        type:SET_CONTAINER_LINE_ADD,
        payload:param
    }
}

export const setListAddTask=(param)=>{
    return {
        type:LIST_ADD_TASK_NEW,
        payload:param
    }
}

export const setItemListSubject=(listWorflowbySub)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(listWorflowbySub)}`
    fetch(url, {method:'GET'})
    .then(res=>res.json())
    .then(res=>{
        dispatch({
            type: LIST_WORKFLOWBY_SUBJECT,
            payload: res.results
            })
            })

}


export const setEmailStoreNew = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/emailTemplate?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:LIST_EMAIL_ADD,
                payload:res.results
            })
        })
}

export const addNewActivity = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'POST'})
        .then(res=>res.json())
        .then(res=>{
// console.log(res)
            dispatch({
                type:ADD_NEW_ACTIVITY,
                payload:param
            })

            dispatch({
                type:RES_DETAILS,
                payload:res.task_id
            })
            
            
        })
}




 



