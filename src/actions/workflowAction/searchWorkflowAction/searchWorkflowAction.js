import {SHOW_ERR,POPULATE_WORKFLOW} from '../../types'

import {biorisUrl} from '../../../config/appConf'
import {converter} from '../../../utils/converter'

//toggle
export const toggleErr = (modalstate) => ({
  type: SHOW_ERR,
  payload: modalstate
})

//Search Workflow
export const populateWorkflow=(param)=>dispatch=>{
  console.log(param)
  const url=biorisUrl+converter(param)  
  fetch(url)
  .then(res=>res.json())
  .then(res=>{ 
      // console.log(res)
      dispatch({           
          type: POPULATE_WORKFLOW,
          payload: res.data
      })
  })

}
