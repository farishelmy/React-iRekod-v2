import {SET_SEL_ALL,CHANGE_ISMULTI,SHOW_MULTIFAB,SHOW_SUB_BTN} from './types'


export const changeMultiSel=(multiStatus)=>dispatch=>{
    dispatch({
        type:CHANGE_ISMULTI,
        payload:multiStatus
    })
     if(!multiStatus){
        dispatch(setSelAll(false))
    }
}

export const setSelAll=(sellAllStats)=>{
    return {
        type:SET_SEL_ALL,
        payload:sellAllStats
    }
}

export const showMultiFab=(multiStatus)=>{
    return {
        type:SHOW_MULTIFAB,
        payload:multiStatus
    }
 }

export const changeSubBtn=(param)=>{
    return {
        type:SHOW_SUB_BTN,
        payload:param
    }
 }
