import { LIST_WORKFLOW, 
    LIST_OF_SUBJECT, 
    POPULATE_WORKFLOW,
    WORKFLOW_TEMPLATE, 
    SET_CARD_VIEW, 
    WORKFLOW_SEL,
    SHOW_FAB,
    LIST_ACTIVITY_DETAIL,
    WORKFLOW_NAME
    } from '../types'
    
    import {biorisUrl} from '../../config/appConf'
    import {converter} from '../../utils/converter'

//List Option Workflow
export const ListWorkflowTemplate=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_WORKFLOW,
            payload: res.data
        })
    })

}

export const setListofSubject=(listofSubjectObj)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(listofSubjectObj)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        dispatch({
            type: LIST_OF_SUBJECT,
            payload: res.results
        })
    })

}

//Workflow Template
export const workflowTemplate=(param)=>dispatch=>{
    dispatch({
        type: WORKFLOW_TEMPLATE,
        payload: param
    })
}

// List of Workflow based on Template
export const populateWorkflow=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: POPULATE_WORKFLOW,
            payload: res.data
        })
    })
}

//Set Workflow Name
export const setWorkflowName=(param)=>{
    return {
        type:WORKFLOW_NAME,
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

//Set Workflow URI
export const setSelWorkFlow=(wrkflSel)=>{
    return {
        type:WORKFLOW_SEL,
        payload:wrkflSel
    }
}

export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Get Activity form workflow
export const getDetails=(param)=>{
    return {
        type:LIST_ACTIVITY_DETAIL,
        payload:param
    }

}



 

 



