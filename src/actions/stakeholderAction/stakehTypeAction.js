import {STAKEH_TYPE,STAKEH_SEL,STAKEH_VIEW,SHOW_FAB,STAKEH_NUMB,STAKEH_LABEL} from '../types'
import {biorisUrl} from '../../config/appConf'
import {converter} from '../../utils/converter'
 
//Set Stakeholder Type Func
export const setStakehType = (param) => dispatch =>{
    // console.log(param)
    const url=biorisUrl+converter(param)
    // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res.data)
            dispatch({
                type:STAKEH_TYPE,
                payload:res.data
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

//Stakeh Label Type
export const setStakehLabel=(param)=>{
    return {
        type:STAKEH_LABEL,
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





 
