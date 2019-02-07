//auth action and reducer link
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOG_OUT='LOG_OUT'
export const AUTH_LOADING = 'AUTH_LOADING'

//layout action and reducer link
export const PAGE_CLASS = 'PAGE_CLASS'
export const SIDENAV_CLASS = 'SIDENAV_CLASS'
export const TOGGLE_SIDENAV = 'TOGGLE_SIDENAV'
export const ACTIVE_PAGE = 'ACTIVE_PAGE'
export const PAGE_TITLE = 'PAGE_TITLE'
export const PAGE_SUBJECT = 'PAGE_SUBJECT'

//search action and reducer link
export const BASIC_SEARCH = 'BASIC_SEARCH'
export const STAKEH_LIST = 'STAKEH_LIST'

//Main Fab action and reducer link 
export const CHANGE_ISMULTI = 'CHANGE_ISMULTI'
export const SET_SEL_ALL = 'SET_SEL_ALL'
export const SHOW_MULTIFAB = 'SHOW_MULTIFAB'

/////////////////////////////////////////////////////Stakeholder/////////////////////////////////////////////////////

//Stakeholder BreadCrumb
export const BC_DETAIL = 'BC_DETAIL'
export const BC_UPDATE = 'BC_UPDATE'
export const BC_INDEX = 'BC_INDEX'

//Stakeholder List
export const STAKEHOLDER_LIST = 'STAKEHOLDER_LIST'

//Stakeholder List Type
export const STAKEH_TYPE = 'STAKEH_TYPE'
export const STAKEH_SEL = 'STAKEH_SEL'
export const STAKEH_VIEW = 'STAKEH_VIEW'
export const SHOW_FAB = 'SHOW_FAB'
export const STAKEH_NUMB = 'STAKEH_NUMB'
export const DELETE_STAKEHOLDER = 'DELETE_STAKEHOLDER'

//Stakeholder Viewer
export const STAKEHOLDER_VIEW = 'STAKEHOLDER_VIEW'
export const STAKEHOLDER_MEMBER = 'STAKEHOLDER_MEMBER'
export const STAKEHOLDER_GROUP = 'STAKEHOLDER_GROUP'
export const STAKEHOLDER_ACC = 'STAKEHOLDER_ACC'

//Stakeholder Update
export const WIZARD_SELECT = 'WIZARD_SELECT'
export const CONTAINER_LINE = 'CONTAINER_LINE'
export const ROLE_STORE = 'ROLE_STORE'
export const ITEM_LIST_ANCESTOR = 'ITEM_LIST_ANCESTOR'
export const ITEM_LIST_DESCENDANT = 'ITEM_LIST_DESCENDANT'
export const STORE_DETAIL = 'STORE_DETAIL'
export const SECURITY_LEVEL = 'SECURITY_LEVEL' 

//Stakeholeder Add
export const ADD_STAKEH = 'ADD_STAKEH'
export const BASIC_DET = 'BASIC_DET'


/////////////////////////////////////////////////////Workflow/////////////////////////////////////////////////////
 

//list workflow action and reducer link
export const LIST_WORKFLOW = 'LIST_WORKFLOW'
export const LIST_OF_SUBJECT = 'LIST_OF_SUBJECT'
export const LIST_OF_CHILDSUBJECT = 'LIST_OF_CHILDSUBJECT'

//breadcrumb action and reducer link
export const SET_BREADCRUMB = 'SET_BREADCRUMB'
export const INSERT_NEW_BREADCRUMB = 'INSERT_NEW_BREADCRUMB'

//listworkflow action and reducer link
export const SET_CARD_VIEW = 'SET_CARD_VIEW'
// export const CHANGE_ISMULTI = 'CHANGE_ISMULTI'
// export const SET_SEL_ALL = 'SET_SEL_ALL'
export const WORKFLOW_SEL = 'WORKFLOW_SEL'
// export const SHOW_FAB = 'SHOW_FAB'
export const SELECT_SEL = 'SELECT_SEL'

//listworkflowdetails action and reducer link
export const LIST_ACTIVITY = 'SET_ACTIVITY'
export const LIST_EMAIL = 'LIST_EMAIL'
export const WIZARD_PAGE = 'WIZARD_PAGE'
export const SET_ACTIVITY_STORE = 'SET_ACTIVITY_STORE'
export const SET_EMAIL_STORE = 'SET_EMAIL_STORE'
export const LIST_ACTIVITY_DETAIL = 'LIST_ACTIVITY_DETAIL'
export const LIST_SUBJECT_ITEM = 'LIST_SUBJECT_ITEM'
export const SET_CONTAINER_LINE = 'SET_CONTAINER_LINE'
export const DELETE_WORKFLOW = 'DELETE_WORKFLOW'
// export const LIST_ADD_TASK = 'LIST_ADD_TASK'
export const LIST_CUSTOM_FIELD_STKH = 'LIST_CUSTOM_FIELD_STKH'
export const LIST_TASK_RESULT_STATUS = 'LIST_TASK_RESULT_STATUS'
export const LIST_SELECTED_TASK_RESULT_TITLE = 'LIST_SELECTED_TASK_RESULT_TITLE'
export const LIST_SELECTED_TASK_RESULT_STATUS = 'LIST_SELECTED_TASK_RESULT_STATUS'
export const TASK_RESULT_DETAIL = 'TASK_RESULT_DETAIL'

//create new activity action and reducer link
export const WIZARD_PAGE_ADD = 'WIZARD_PAGE_ADD'
export const SET_CONTAINER_LINE_ADD = 'SET_CONTAINER_LINE_ADD'
export const LIST_WORKFLOWBY_SUBJECT = 'LIST_WORKFLOWBY_SUBJECT'
export const LIST_EMAIL_ADD = 'LIST_EMAIL_ADD'
export const LIST_ADD_TASK_NEW = 'LIST_ADD_TASK_NEW'
export const ADD_NEW_ACTIVITY = 'ADD_NEW_ACTIVITY'
export const RES_DETAILS = 'RES_DETAILS'

//update activity action and reducer link
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY'
export const LIST_UPDATE_ACTIVITY = 'LIST_UPDATE_ACTIVITY'
export const SELECTED_RECIPIENTS = 'SELECTED_RECIPIENTS'
export const LIST_EMAIL_RECIPIENTS = 'LIST_EMAIL_RECIPIENTS'
export const SELECTED_INC_STAKEH = 'SELECTED_INC_STAKEH'
export const VIEW_RECIPIENTS = 'VIEW_RECIPIENTS'

/////////////////////////////////////////////////////AuditTrail//////////////////////////////////////////////////////


//record action and reducer link
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE'
export const SET_PAGING = 'SET_PAGING'
// export const SET_CARD_VIEW = 'SET_CARD_VIEW'
export const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_STARTPAGE = 'SET_STARTPAGE'
// export const CHANGE_ISMULTI = 'CHANGE_ISMULTI'
// export const SHOW_FAB = 'SHOW_FAB'
// export const SHOW_MULTIFAB = 'SHOW_MULTIFAB'
export const SET_ISCONTAINER = 'SET_ISCONTAINER'
export const REC_ITEM_ACCESS_DEL = 'REC_ITEM_ACCESS_DEL'
export const REC_ITEM_ACCESS_EDIT = 'REC_ITEM_ACCESS_EDIT'
export const REC_ITEM_ACCESS_ACL = 'REC_ITEM_ACCESS_ACL'
export const SET_SEL_REC = 'SET_SEL_REC'
// export const SET_SEL_ALL = 'SET_SEL_ALL'


//dashboard action and reducer link
export const DASH_LOADER = 'DASH_LOADER'
export const FOLDER_SUM_TODAY = 'FOLDER_SUM_TODAY'
export const DOCUMENT_SUM_TODAY = 'DOCUMENT_SUM_TODAY'
export const NEW_BATCH_QUE = 'NEW_BATCH_QUE'
export const FOLDER_SUM_MONTH = 'FOLDER_SUM_MONTH'
export const DOC_SUM_MONTH = 'DOC_SUM_MONTH'
export const FOLDER_SUM_YEAR = 'FOLDER_SUM_YEAR'
export const DOC_SUM_YEAR = 'DOC_SUM_YEAR'
export const SUM_TODAY = 'SUM_TODAY'
export const SUM_YEAR = 'SUM_YEAR'


//modal action and reducer link
export const SHOW_ADV = 'SHOW_ADV'
export const SHOW_FORM = 'SHOW_FORM'
export const SHOW_ERR = 'SHOW_ERR'
export const SHOW_LOADER = 'SHOW_LOADER'
export const SET_LOADER_TEXT = 'SET_LOADER_TEXT'

//stakeholder action and reducer link
// export const STAKEH_LIST = 'STAKEH_LIST'
export const RECORD_LIST = 'RECORD_LIST'
export const ACTION_TYPES = 'ACTION_TYPES'



//err log action and reducer link
export const LIST_BATCH_ERR = 'LIST_BATCH_ERR'
export const LIST_BATCH_ERR2 = 'LIST_BATCH_ERR2'


//err audit action and reducer link
export const LIST_AUDIT = 'LIST_AUDIT'

//batchLoad action and reducer link
export const LIST_BATCH = 'LIST_BATCH'
export const BATCH_UPLOAD = 'BATCH_UPLOAD'

//search action and reducer link
export const SET_SEARCH_PARAM = 'SET_SEARCH_PARAM'
export const GET_BASIC_SEARCH = 'GET_BASIC_SEARCH'
export const GET_ADV_SEARCH = 'GET_ADV_SEARCH'
export const GET_CONTAINER = 'GET_CONTAINER'


//editor action and reducer link
export const ACTIVE_EDITOR = 'ACTIVE_EDITOR'
export const ACTIVE_HEADER = 'ACTIVE_HEADER'
export const GET_AUDIT_LOG = 'GET_AUDIT_LOG'
export const GET_REC_DETAILS = 'GET_REC_DETAILS'
export const SAVE_RECORD = 'SAVE_RECORD'
export const GET_CONTENT_FILE_ID = 'GET_CONTENT_FILE_ID'
export const GET_IFRAME = 'GET_IFRAME'
export const IS_DELETE = 'IS_DELETE'

//child action and reducer link
export const GET_CHILD = 'GET_CHILD'
export const CHILD_TOTAL_REC = 'CHILD_TOTAL_REC'
export const SET_CHILD_PARAM = 'SET_CHILD_PARAM'
export const CHILD_CURRENT_PAGE = 'CHILD_CURRENT_PAGE'
export const CHILD_START_PAGE = 'CHILD_START_PAGE'
export const CHILD_LIMIT_PAGE = 'CHILD_LIMIT_PAGE'
export const CHILD_ITEM_ACCESS_DEL = 'CHILD_ITEM_ACCESS_DEL'
export const CHILD_ITEM_ACCESS_EDIT = 'CHILD_ITEM_ACCESS_EDIT'
export const CHILD_ITEM_ACCESS_ACL = 'CHILD_ITEM_ACCESS_ACL'
export const CHILD_SEL_REC = 'CHILD_SEL_REC'
export const SHOW_CHILD_FAB = 'SHOW_CHILD_FAB'
export const ACTIVATE_CHILD = 'ACTIVATE_CHILD'
// export const RESET_CHILD = 'RESET_CHILD'

 


 
 
 