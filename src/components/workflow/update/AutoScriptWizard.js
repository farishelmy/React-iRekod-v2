import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../../actions/layoutInitAction'
import {updateActivity} from '../../../actions/workflowAction/updateActAction'
import {setSelDetails} from '../../../actions/workflowAction/authListWorkFlow'

class AutoScriptWizard extends Component {

  constructor(){
    super()
    this.state={
        is_enable_auto_scripting: null,
        auto_scripting: null,   
    }        
}  

componentWillMount(){

  const {
     is_enable_auto_scripting ,
     auto_scripting ,
     
  } = this.props.item


this.setState({
  is_enable_auto_scripting,
  auto_scripting,
})    

}


componentDidUpdate(prevProps){
  if(prevProps.listWrkFlw.selDetails!==this.props.listWrkFlw.selDetails){
    // console.log(prevProps.workflowDetail.activityDet)
      const {is_enable_auto_scripting,auto_scripting} = this.props.item

      this.setState({
          is_enable_auto_scripting: is_enable_auto_scripting,            
          auto_scripting: auto_scripting   
      })      
  }
}

handleChange=(event)=>{
  // e.preventDefault()
   const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name   

this.setState({
    [input]:inputVal,
  }) 
} 

setActivePage=(e)=>{
  e.preventDefault()       
  this.props.setActivePage(e.target.getAttribute('data-pagename'))
}

formSubmit=(e)=>{
  e.preventDefault()

  const {user:{bio_access_id:bId}} = this.props.session
  const {
    task_id,
    title,
    subject,
    instruction,
    estimated_duration,
    is_important,
    is_auto_start,
    default_assignor_id,
    default_assignor_name,
    default_assignee_id,
    default_assignee_name,
    default_supervisor_id,
    default_supervisor_name,
    default_manager_id,
    default_manager_name,
    parent_id,
    prev_task_id,
    prev_task_title,
    additional_tasks,
    next_task_id,
    next_task_title,
    is_decision,
    task_results,
    acl_id: acl_id,
    acl_entries,
    email_template_id,
    recipients:recipients,
    include_assignee,
    include_home,
    include_owner,
    include_stakeholders,
    stakeholder_fields,
  } = this.props.item

   const { 
    is_enable_auto_scripting ,
    auto_scripting } = this.state

  const updateObj={
    task_id:task_id,
    title: title,
    subject: subject,
    instruction: instruction,
    estimated_duration: estimated_duration,
    is_important: is_important,
    is_auto_start: is_auto_start,
    default_assignor_id: default_assignor_id,
    default_assignor_name: default_assignor_name,
    default_assignee_id:default_assignee_id,
    default_assignee_name: default_assignee_name,
    default_supervisor_id: default_supervisor_id,
    default_supervisor_name: default_supervisor_name,
    default_manager_id: default_manager_id,
    default_manager_name: default_manager_name,
    parent_id: parent_id,
    prev_task_id: prev_task_id,
    prev_task_title: prev_task_title,
    additional_tasks: additional_tasks,
    next_task_id: next_task_id,
    next_task_title: next_task_title,
    is_decision: is_decision,
    task_results: task_results,
    acl_id: acl_id,
    acl_entries: acl_entries,
    email_template_id: email_template_id,
    recipients:recipients,
    include_assignee: include_assignee,
    include_home: include_home,
    include_owner: include_owner,
    include_stakeholders: include_stakeholders,
    stakeholder_fields: stakeholder_fields,

    is_enable_auto_scripting: is_enable_auto_scripting,
    auto_scripting: auto_scripting,

    bio_access_id: bId,
    action: "SAVE_TASK" 

  }   
  this.props.updateActivity(updateObj)
  console.log(updateObj)
  alert("Successful Update")

  const selDetails={
    task_id: task_id,
    action: "ITEM_DETAIL",
    bio_access_id: bId       
}
this.props.setSelDetails(selDetails)

}

  render() {
    const { is_enable_auto_scripting, auto_scripting} = this.state
    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Auto Script</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/programming.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="col-6 col-md-4 form-group">
                    <label>
                            <input name="is_enable_auto_scripting" type="checkbox" onChange={this.handleChange} checked={is_enable_auto_scripting}/> Enable Auto Scripting
                          </label>
                    </div>
                 
                    <div className="form-group col">
                      <label>Scripts</label>
                            <textarea name="auto_scripting" rows="10" cols="50" className="form-control" onChange={this.handleChange} value={decodeURIComponent(auto_scripting)}/>       
                    </div>
                  </div>
          </div> 
          <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" data-pagename="listOfWorkflow" onClick={this.setActivePage}>Close</button>
                </div>
     </form>
      </Fragment>
    )
  }
}

AutoScriptWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired, 
  updateActivity:PropTypes.func.isRequired, 
  setActivePage: PropTypes.func.isRequired,
  listWrkFlw:PropTypes.object.isRequired, 
  setSelDetails:PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
})
  
export default connect(mapStateToProps, {updateActivity, setActivePage, setSelDetails})(AutoScriptWizard)

