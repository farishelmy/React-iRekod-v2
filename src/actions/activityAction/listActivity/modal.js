import {
    SHOW_ERR,
    SHOW_COMPLETE
} from '../../types'
    
import {biorisUrl} from '../../../config/appConf'
import {converter} from '../../../utils/converter'

//toggle
export const toggleErr = (modalstate) => ({
    type: SHOW_ERR,
    payload: modalstate
})

//Toggle Complete
export const showComplete = (modalstate) => ({
    type: SHOW_COMPLETE,
    payload: modalstate
})

//Change Assignee
export const changeAssignee=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        console.log(res)
        // dispatch({           
        //     type: LIST_ACTIVITY_DUE,
        //     payload: res.data
        // })
    })

}

//Activity Complete
export const completeActivity=(param)=>dispatch=>{
    const url=biorisUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        console.log(res)
        // dispatch({           
        //     type: GET_RESULT,
        //     payload: res.data[1].config
        // })
    })

}