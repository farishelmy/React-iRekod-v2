import {STAKEHOLDER_VIEW,STAKEHOLDER_MEMBER,STAKEHOLDER_GROUP,STAKEHOLDER_ACC,DELETE_STAKEHOLDER} from '../types'
import {biorisUrl} from '../../config/appConf'

//Call stkh Detail
export const setStakeholderItemDetail = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)           
            dispatch({
                type:STAKEHOLDER_VIEW,payload:res.results
            })
        })
}

//Call member 
export const viewStakehMember = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:STAKEHOLDER_MEMBER,payload:res.results
            })
        })
}

//Call group
export const viewStakehGroup = (param) => dispatch => {
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res.results)
        if(res.results!==undefined){
            dispatch({
                type:STAKEHOLDER_GROUP,payload:res.results
            })
        }
        
    })
}

export const viewStakehAccess = (param) => dispatch => {
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res)
        dispatch({
            type:STAKEHOLDER_ACC,payload:res.results
        })
    })
} 

//Delete Function
export const setDelBtn=(param)=>dispatch=>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`    
    fetch(url,{method:'DELETE'})
    .then(res=>res.json())
    .then(res=>{
        // console.log(res)
        dispatch({
            type:DELETE_STAKEHOLDER,payload:res.results
        })
    })

}


