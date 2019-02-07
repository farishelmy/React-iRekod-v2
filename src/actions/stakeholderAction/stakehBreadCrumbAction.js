import {BC_INDEX,BC_DETAIL,BC_UPDATE} from '../types'
 
 
//Fab
export const bcIndex=(param)=>{
    return {
        type:BC_INDEX,
        payload:param
    }
}

export const bcDet=(param)=>{
    return {
        type:BC_DETAIL,
        payload:param
    }
}

export const bcUpd=(param)=>{
    return {
        type:BC_UPDATE,
        payload:param
    }
}
 



 
