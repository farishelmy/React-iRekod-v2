import { LIST_ACTIVITY, WIZARD_PAGE, SET_ACTIVITY_STORE, SET_RECORD_STORE,LIST_SUBJECT_ITEM ,SET_CONTAINER_LINE, DELETE_WORKFLOW, TASK_RESULT_DETAIL,
        LIST_CUSTOM_FIELD_STKH, LIST_TASK_RESULT_STATUS, LIST_SELECTED_TASK_RESULT_TITLE, LIST_SELECTED_TASK_RESULT_STATUS } from '../types'

import {biorisUrl} from '../../config/appConf'
import {converter} from '../../utils/converter'


//Get workflow details
export const setListActivity=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)
    fetch(url)
    .then(res=>res.json())
    .then(res=>{  
        dispatch({
            type: LIST_ACTIVITY,
            payload: res.data
        })
    })

}

//Get Record
export const setRecordStore = (param) => dispatch =>{
    // console.log(param)
    const url=biorisUrl+converter(param)
    // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:SET_RECORD_STORE,
                payload:res.data
            })
        })
}

//Set Wizard Page Name
export const setWizardPage=(param)=>{
    return {
        type:WIZARD_PAGE,
        payload:param
    }
}

//Set Container Line
export const setContinerLine=(param)=>{
    return {
        type:SET_CONTAINER_LINE,
        payload:param
    }
}

// export const setListAddTask=(param)=>{
//     return {
//         type:LIST_ADD_TASK,
//         payload:param
//     }
// }

export const setListTaskResultTitle=(param)=>{
    return {
        type:LIST_SELECTED_TASK_RESULT_TITLE,
        payload:param
    }
}

export const setListTaskResultStatus=(param)=>{
    return {
        type:LIST_SELECTED_TASK_RESULT_STATUS,
        payload:param
    }
}

export const setActivityStore = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:SET_ACTIVITY_STORE,
                payload:res.results
            })
        })
}



export const setItemListSubject = (itemListSubject) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(itemListSubject)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:LIST_SUBJECT_ITEM,
                payload:res.results
            })
        })
}

export const setDelBtn = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'DELETE'})
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            dispatch({
                type:DELETE_WORKFLOW,
                payload:res.results
            })
        })
}

export const setCustomField = (customFieldObj) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/customField?param=${JSON.stringify(customFieldObj)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:LIST_CUSTOM_FIELD_STKH,
                payload:res.results
            })
        })
}

export const setTaskResult = (taskResulStatusObj) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/listOfValue?param=${JSON.stringify(taskResulStatusObj)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:LIST_TASK_RESULT_STATUS,
                payload:res.results
            })
        })
}

//Task Result Detail
export const SetTaskResultDetail = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:TASK_RESULT_DETAIL,
                payload:res.results
            })
        })
}





 



