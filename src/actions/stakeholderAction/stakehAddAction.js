import {ADD_STAKEH,BASIC_DET} from '../types'
import {biorisUrl} from '../../config/appConf'

//Add Stakeholder
export const addStkh = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url,{method:'PUT'})
        .then(res=>res.json())
        .then(res=>{ 
            // console.log(res)
            dispatch({
                type:ADD_STAKEH,payload:res.stakeholder_id
            })
            dispatch({
                type:BASIC_DET,payload:param
            })

        })
}

//Add Child
export const addChild = (addChildParam,stakeholder_id) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(addChildParam)}`
        fetch(url,{method:'PUT'})
        .then(res=>res.json())
        .then(res=>{ 
            // console.log(res)
            dispatch({
                type:ADD_STAKEH,payload:res.stakeholder_id
            })
             dispatch({
                type:BASIC_DET,payload:addChildParam
            })           
             
            const memberSource = {
                action: "ADD_CHILD_ITEM",
                bio_access_id: addChildParam.bio_access_id,
                parent_id: stakeholder_id,  
                child_id: res.stakeholder_id              
            }       
            const url=`${biorisUrl}/stakeholder?param=${encodeURIComponent(JSON.stringify(memberSource))}`
            fetch(url,{method:'POST'})
            .then(res=>res.json())
            .then(res=>{ 
                // console.log(res)

            })    
        })
}

// export const addStkh = (param) => {
//     console.log(param)
//     return {
//         type:BASIC_DET,
//         payload:param
//     }
// }