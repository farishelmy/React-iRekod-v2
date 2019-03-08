import {SHOW_ERR,LIST_ACTIVITY} from '../../types'

import {biorisUrl} from '../../../config/appConf'
import {converter} from '../../../utils/converter'

//toggle
export const toggleErr = (modalstate) => ({
  type: SHOW_ERR,
  payload: modalstate
})

//Search Workflow
export const populateActivity=(param)=>dispatch=>{
  // console.log(param)
  const url=biorisUrl+converter(param)  
  fetch(url)
  .then(res=>res.json())
  .then(res=>{ 
      // console.log(res)
      dispatch({           
          type: LIST_ACTIVITY,
          payload: res.data
      })
  })

}
