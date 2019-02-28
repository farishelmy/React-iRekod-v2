import {LIST_ACTIVITY_DUE} from '../../types'
    
import {biorisUrl} from '../../../config/appConf'
import {converter} from '../../../utils/converter'

//List Option Workflow
export const setListActDue=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_ACTIVITY_DUE,
            payload: res.data
        })
    })

}