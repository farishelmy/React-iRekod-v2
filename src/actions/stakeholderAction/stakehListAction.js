import {STAKHOLDER_TYPE_LIST,STAKEHOLDER_LIST} from '../types'
import {biorisUrl} from '../../config/appConf'

//Stakeholder List
export const setStakehList = (param) => dispatch =>{
    // console.log(stakehType)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:STAKEHOLDER_LIST,
                payload:res.results
            })
        })
}

//Update Stakeh List
export const newStakehList=(param)=>{
    return {
        type:STAKEHOLDER_LIST,
        payload:param
    }
}
 