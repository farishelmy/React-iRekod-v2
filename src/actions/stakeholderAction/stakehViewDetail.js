import {STAKEHOLDER_VIEW,STAKEH_TYPE,STAKEHOLDER_MEMBER,STAKEHOLDER_GROUP,STAKEHOLDER_ACC,DELETE_STAKEHOLDER} from '../types'
import {biorisUrl} from '../../config/appConf'
import {converter} from '../../utils/converter'

//Call stkh Detail
// export const setStakeholderItemDetail = (param) => dispatch =>{
//     // console.log(param)
//     const url=biorisUrl+converter(param)
//         fetch(url)
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res.data)           
//             dispatch({
//                 type:STAKEHOLDER_VIEW,
//                 payload:res.data
//             })
//         })
// }

//Call stkh Detail
export const setStakeholderItemDetail = (param) => {
    return {
        type:STAKEHOLDER_VIEW,
        payload:param
    }
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


