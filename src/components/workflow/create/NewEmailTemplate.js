import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../../actions/layoutInitAction'
import {addNewActivity} from '../../../actions/workflowAction/createNewActAction'
import { setRecipients, setIncStakeh} from '../../../actions/workflowAction/updateActAction'

class NewEmailTemplate extends Component {

  constructor(){
    super()
    this.state={
        task_id: null,
        emailTemp:[],
        recepients:null,
        include_assignee: false,
        include_home: false,
        include_owner: false,
        include_stakeholders: false,
        email_template_id: null,
        recipients: null,
        incStakeh:[],
        emailTempName: "",
        inc_stakeh:false,
        title: null,
        subject: null,
        instruction: null,
        estimated_duration: 0,
        is_important: false,
        is_auto_start: false,
        default_assignor_id: null,
        default_assignor_name: null,
        default_assignee_id: null,
        default_assignee_name: null,
        default_supervisor_id: null,
        default_supervisor_name: null,
        default_manager_id: null,
        default_manager_name: null,
        parent_id: null,
        prev_task_id: null,
        prev_task_title: null,
        additional_tasks: [],
        next_task_id: null,
        next_task_title: null,
        is_decision: false,
        task_results: [],
        acl_id: null,
        acl_entries: null,
    }        
}  


handleEmailTempChange=(value)=>{
  this.setState({
    emailTempName:value,
  })
  // this.props.setValueEmail(value)
}

handleRecepientsChange=(value)=>{
  const viewSource = value.map(item =>({
    recipient_id: item.value,
    recipient_name: item.label
}))

this.props.setRecipients(viewSource)

  this.setState({
    recepients:value,
  })
}

handleIncStakehsChange=(value)=>{
  const incStake = value.map(item =>({
    stakeholder_field_id: item.value,
    stakeholder_field_label: item.label
}))

this.props.setIncStakeh(incStake)

  this.setState({
    incStakeh:value,
  })
}

handleChange=(event)=>{

const target = event.target
const inputVal =  target.type==="checkbox"?target.checked:target.value 
const input = target.name   

this.setState({
  [input]:inputVal,
}) 
} 

formSubmit=(e)=>{
  e.preventDefault()
  const {user:{bio_access_id:bId}} = this.props.session
  const {newActObj, resAct} = this.props.crtNewReducer
  const {recipients, incStakehObj} = this.props.updActReducer
  console.log(newActObj.stakehValAssigneeNew)

  const { 
  emailTempName, 
  include_assignee,
  include_home,
  include_stakeholders,
  include_owner,
  } = this.state


    const newEmailObj={

    email_template_id: emailTempName.value,
    include_assignee: include_assignee,
    include_home: include_home,
    include_owner: include_owner,
    include_stakeholders: include_stakeholders,
    recipients: recipients,
    stakeholder_fields: incStakehObj,

        task_id:resAct,
        title: newActObj.title,
        subject: newActObj.subject,
        instruction: newActObj.instruction,
        estimated_duration: newActObj.estimated_duration,
        is_important: newActObj.is_important,
        is_auto_start: newActObj.is_auto_start,
        default_assignor_id: newActObj.default_assignor_id,
        default_assignor_name: newActObj.default_assignor_name,
        default_assignee_id:newActObj.default_assignee_id,
        default_assignee_name: newActObj.default_assignee_name,
        default_supervisor_id: newActObj.default_supervisor_id,
        default_supervisor_name: newActObj.default_supervisor_name,
        default_manager_id: newActObj.default_manager_id,
        default_manager_name: newActObj.default_manager_name,
        parent_id: newActObj.parent_id,
        prev_task_id: newActObj.prev_task_id,
        prev_task_title: newActObj.prev_task_title,
        additional_tasks: newActObj.additional_tasks,
        next_task_id: newActObj.next_task_id,
        next_task_title: newActObj.next_task_title,
        is_decision: newActObj.is_decision,
        task_results: newActObj.task_results,
        acl_id: newActObj.acl_id,
        acl_entries: newActObj.acl_entries,
        is_enable_auto_scripting: newActObj.is_enable_auto_scripting,
        auto_scripting: newActObj.auto_scripting,

        bio_access_id: bId,
        action: "SAVE_TASK" 
  }       

  this.props.addNewActivity(newEmailObj)
  console.log(newEmailObj)
  alert("Successful Created")
}

setActivePage=(e)=>{
  e.preventDefault()       
  this.props.setActivePage(e.target.getAttribute('data-pagename'))
}

render() {

    const {
      include_assignee,
      include_home ,
      include_owner,
      include_stakeholders,
      inc_stakeh,
      recepients,
      incStakeh, emailTempName,
   } = this.state
   

  const {stakehList} = this.props.stakeholderList
  const {listEmailObj} = this.props.crtNewReducer
  const optionEmailTemp = listEmailObj.map((itm => ({ value: itm.email_template_id, label:decodeURIComponent(itm.name)})))
  const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))

  const {customFieldObj} = this.props.workflowDetail
  const optionCustomField = customFieldObj.map((itm => ({ value: itm.custom_field_id, label:decodeURIComponent(itm.custom_field_name)})))

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Email Notification</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/email.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="form-group col">
                          <label>Email Template</label>
                                <Select
                                className="basic-single"
                              onChange={this.handleEmailTempChange}
                              options={optionEmailTemp}
                              value={emailTempName}
                              isClearable
                            />
                    </div>
                 
                    <div className="form-group col">
                          <label>Recepients</label>
                                <Select
                              onChange={this.handleRecepientsChange}
                              options={stakehOptions}
                              value={recepients}
                              isMulti
                              isClearable
                            />
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_assignee" type="checkbox" onChange={this.handleChange} checked={include_assignee}/> Include Assignee
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_home" type="checkbox" onChange={this.handleChange} checked={include_home}/> Include Home
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_owner" type="checkbox" onChange={this.handleChange} checked={include_owner}/> Include Owner
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_stakeholders" type="checkbox" onChange={this.handleChange} checked={include_stakeholders}/> Include Stakeholder
                        </label>
                    </div>
                  
                  <div className="form-group col">
                  <div className={include_stakeholders===null||include_stakeholders=== false?"d-none":"autoUpdate row"}>
                      <div className="form-group col">
                        <label>Stakeholders</label>
                          <Select
                              onChange={this.handleIncStakehsChange}
                              options={optionCustomField}
                              value={incStakeh}
                              isMulti
                              isClearable
                            />
                        </div>
                  </div>
                  </div>
                  </div>
                  </div>

             <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" data-pagename="listOfWorkflow" onClick={this.setActivePage}>Close</button>
                </div>

     </form>
      </Fragment>
    )
  }
}

NewEmailTemplate.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired, 
  stakeholderList: PropTypes.object.isRequired, 
  workflowDetail:PropTypes.object.isRequired,  
  listWrkFlw: PropTypes.object.isRequired,  
  crtNewReducer:  PropTypes.object.isRequired,
  addNewActivity:PropTypes.func.isRequired,
  setRecipients:PropTypes.func.isRequired,
  setIncStakeh:PropTypes.func.isRequired,
  updActReducer:PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
      crtNewReducer: state.crtNewReducer,
      updActReducer: state.updActReducer,
      stakeholderList: state.stakeholderList,
})
  
export default connect(mapStateToProps, {addNewActivity, setRecipients, setIncStakeh, setActivePage})(NewEmailTemplate)
