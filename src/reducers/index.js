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
import modalReducer from './workflowReducer/modalReducer'
// import workFlowDetailsReducer from './workflowReducer/workflowDetailReducer'
// import createNewReducer from './workflowReducer/createNewActReducer'
// import updateActReducer from './workflowReducer/updateActReducer'

//activity
import listofActivityReducer from './activityReducer/activityReducer'
 


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

    //modal
    modal:modalReducer,

    //activity
    listActivity:listofActivityReducer,

     
    
  
 })

export const rootReducer = ( state, action ) => {
   if ( action.type === LOG_OUT ) {
     state = undefined
   }
   return appReducer(state, action)
 }
