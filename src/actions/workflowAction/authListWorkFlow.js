import { LIST_WORKFLOW, 
    LIST_OF_SUBJECT, 
    LIST_OF_CHILDSUBJECT, 
    SET_CARD_VIEW, 
    WORKFLOW_SEL,
    SHOW_FAB,
    LIST_ACTIVITY_DETAIL,
    } from '../types'
    
    import {biorisUrl} from '../../config/appConf'
    import {converter} from '../../utils/converter'


export const setListWorkFlow=(listWrkFlwObj)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(listWrkFlwObj)}`    
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ console.log(res)
        dispatch({           
            type: LIST_WORKFLOW,
            payload: res.results
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

export const listWorkFlowSub=(listSub)=>dispatch=>{
    dispatch({
        type: LIST_OF_CHILDSUBJECT,
        payload: listSub
        })
}


 export const setCardView=(cardStatus)=>{
    console.log(cardStatus)
   return {
       type:SET_CARD_VIEW,
       payload:cardStatus
   }
}

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

export const setSelDetails=(selDetails)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(selDetails)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        dispatch({
            type: LIST_ACTIVITY_DETAIL,
            payload: res.results
        })
    })

}
 

 



