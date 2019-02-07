import {SET_SEL_ALL,CHANGE_ISMULTI,SHOW_MULTIFAB} from './types'


export const changeMultiSel=(multiStatus)=>dispatch=>{
    console.log(multiStatus)
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