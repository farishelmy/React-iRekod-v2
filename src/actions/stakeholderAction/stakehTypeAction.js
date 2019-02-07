import {STAKEH_TYPE,STAKEH_SEL,STAKEH_VIEW,SHOW_FAB,STAKEH_NUMB} from '../types'
import {biorisUrl} from '../../config/appConf'

//Set Stakeholder Type Func
export const setStakehType = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            // console.log(res.results)
            dispatch({
                type:STAKEH_TYPE,payload:res.results
            })
        })
}

//Set New Stakeh Type (After Delete)
export const newStakehType=(param)=>{
    return {
        type:STAKEH_TYPE,
        payload:param
    }
}

//Select stakeholder
export const setStakehSel=(stakehSel)=>{
    return {
        type:STAKEH_SEL,
        payload:stakehSel
    }
}

//Layout 
export const setStakehViewTrue=(param)=>{
    return {
        type:STAKEH_VIEW,
        payload:param
    }
}

export const setStakehViewFalse=(param)=>{
    return {
        type:STAKEH_VIEW,
        payload:param
    }
}

//Fab
export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Stakeh Number Type
export const setStakehNumb=(param)=>{
    return {
        type:STAKEH_NUMB,
        payload:param
    }
}





 
