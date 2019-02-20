//put all of reducer inside this file
import {combineReducers} from 'redux'
import {LOG_OUT} from '../actions/types'
import authReducer from './authReducer'
import layoutInitReducer from './layoutInitReducer'
import searchReducer from './searchReducer'
import fabReducer from './MainFabReducer'
import breadcrumbReducer from './breadcrumbReducer'

//stakeholder
import stakeholderList from '../reducers/stakeholderReducer/stakeholderListReducer'
import stakeholderReducer from './stakeholderReducer/stakeholderListTypeReducer'
import stakeholderView from './stakeholderReducer/stakeholderViewReducer'
import stakeholderUpdate from './stakeholderReducer/stakeholderUpdateReducer'
import stakeholderAdd from './stakeholderReducer/stakeholderAddReducer'

//workflow
import listWorkFlowReducer from './workflowReducer/listWorkflowReducer'
// import workFlowDetailsReducer from './workflowReducer/workflowDetailReducer'
// import createNewReducer from './workflowReducer/createNewActReducer'
// import updateActReducer from './workflowReducer/updateActReducer'

//auditTrail
// import dashReducer from './auditTrailReducer/dashReducer'
// import modalReducer from './auditTrailReducer/modalReducer'
// import stakehReducer from './auditTrailReducer/stakehReducer'
// import eventReducer from './auditTrailReducer/eventReducer' 
// import recReducer from './auditTrailReducer/recReducer'
// import auditReducer from './auditTrailReducer/auditReducer'
// import childRecReducer from './childRecReducer'
// import editorReducer from './editorReducer'
// import recordReducer from './recordReducer'
// import batchLoadReducer from './batchLoadReducer'
// import logReducer from './logReducer'


const appReducer = combineReducers({
    session:authReducer,
    layout:layoutInitReducer,
    fab:fabReducer,
    searchConf:searchReducer,
    breadcrumb:breadcrumbReducer,

   
    //stakeholder
    stakeholderList:stakeholderList,
    stakeholderlistType:stakeholderReducer,    
    stakeholderView:stakeholderView,
    stakeholderUpdate:stakeholderUpdate,
    stakeholderAdd:stakeholderAdd,

    //workflow
    listWorkflow: listWorkFlowReducer,
    // workflowDetail: workFlowDetailsReducer,
    // crtNewReducer: createNewReducer,
    // updActReducer: updateActReducer,

    //auditTrail
    // dashConf:dashReducer,
    // modalConf:modalReducer,
    // stakeholder:stakehReducer,
    // record:recReducer,    
    // actionTy:eventReducer,     
    // auditlog:auditReducer,
    // batchErrLog:logReducer,
    // batchLoad:batchLoadReducer,
    // records:recordReducer,
    // editor:editorReducer,
    // childConf:childRecReducer,
    
  
 })

export const rootReducer = ( state, action ) => {
   if ( action.type === LOG_OUT ) {
     state = undefined
   }
   return appReducer(state, action)
 }
