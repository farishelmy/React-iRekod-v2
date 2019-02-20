import React, { Component, Fragment } from 'react'
import Select from 'react-select'
// import FormHelperText from "@material-ui/core/FormHelperText";

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'

import {setActivePage} from '../../../actions/layoutInitAction'
import {setItemListSubject, setListAddTask, addNewActivity} from '../../../actions/workflowAction/createNewActAction'
class NewActivityWizard extends Component {

  constructor(){
    super()
    this.state={
        stakehValAssignorNew: [],
        stakehValAssigneeNew: [],
        stakehValSupervisorNew: [],
        stakehValManagerNew: [],
        prevTaskNew:[],
        nextTaskNew:[],
        hasDecision:false,
        accViewVal:[],
        accUpdVal:[],
        accRmvVal:[],
        accModVal:[],
        addTaskTitle:[],
        rows: [],
        
        task_id:null,
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
        task_results: null,
        acl_id: null,
        acl_entries: null,

        email_template_id: null,
        recipients: [],
        include_assignee: false,
        include_home: false,
        include_owner: false,
        include_stakeholders: false,
        stakeholder_fields: [],
        is_enable_auto_scripting: false,
        auto_scripting: null,

        hasError: false,

        resultTitle:[],
        resultStatus:[],     
        addTitle:[],  

    }        
  }  

  componentWillMount(){   
    const {subject, title, task_results, additional_tasks} = this.state          
    

    this.setState({
      subject: subject,
      title:title,               
     
    })  
  }   

  //Basic
  handleChange=(event)=>{
    // const hd = this.state.hasDecision
    //   this.setState({
    //   hasDecision:!hd
    //     })

  const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name   

  this.setState({
      [input]:inputVal,
    }) 
  }

  handleSubjectChange=(value)=>{
    const {user:{bio_access_id:bId}}=this.props.session
  
    this.setState({
      subject:value,
      hasError: false
    })
    
    const listWorflowbySub={
      action: "ITEM_LIST_BY_SUBJECT",
      bio_access_id: bId,
      subject: value.label   
    }
  
    this.props.setItemListSubject(listWorflowbySub)
  }


  handleTextChange=(e)=>{
    const inputName = e.target.getAttribute('name')
    const inputVal =  e.target.value===""?e.target.value=null:e.target.value  

  this.setState({
      [inputName]:inputVal
    })  
  }  

  //Stakeholder
  handleAssignorChange=(value)=>{
    this.setState({
      stakehValAssignorNew:value,
   })
  }

  handleAssigneeChange=(value)=>{
    this.setState({
      stakehValAssigneeNew:value
     })
  }

  handleManagerChange=(value)=>{
    this.setState({
      stakehValManagerNew:value
   })
  } 

 handleSupervisorChange=(value)=>{
    this.setState({
      stakehValSupervisorNew:value
     })
  }

  //Task
  handlePrevTaskChange=(value)=>{
  const pt = this.state.prev_task_title
    pt==="" || null?
    this.setState({
      prevTaskNew:""
    }):
    this.setState({
      prevTaskNew:value
    })      
  }

  handleNextTaskChange=(value)=>{
    const nt = this.state.next_task_title
    nt ===""||null?
    this.setState({
      nextTaskNew:"",
    }):
    this.setState({
      nextTaskNew:value,
    })  
  }    
  
   
  //Handle Additional Task
  handleAdditionalTask= idx => selected =>{
    const {label,value}  = selected   
    const {additional_tasks,task_id} = this.state           
    const addTitle = ({label:label, value:value})  
    const new_additional_tasks = [...additional_tasks]   
    new_additional_tasks[idx]= {
        additional_task_id: additional_tasks[idx].additional_task_id,  
        parent_id: task_id,//task_results[idx].parent_id,
        task_id: value,
        task_title: label,            
        sort_order: additional_tasks[idx].sort_order
      }        
    this.setState({
        additional_tasks:new_additional_tasks,
        addTitle:addTitle,            
    })                
  } 

  //Add Additional Task Row 
  handleAddRowAdditionalTask= () => { 
    const {additional_tasks} = this.state
  
    const item = {
        sort_order: additional_tasks.length + 1,        
        // task_id:itm.task_id                         
    }

    this.setState({
        additional_tasks: [...additional_tasks,item]
    })
  }

  //Remove Additional Task 
  handleRemoveSpecificAddtionalTaskRow = idx => () => {
    const additional_tasks = [...this.state.additional_tasks]   
    additional_tasks.splice(idx, 1)
    this.setState({ additional_tasks })        
  }


 

  //Acl
  handleViewChange=(value)=>{
    this.setState({
      accViewVal:value
    })
  }

  handleUpdateChange=(value)=>{
    this.setState({
      accUpdVal:value
    })
  }

  handleRemoveChange=(value)=>{
    this.setState({
      accRmvVal:value,
    })
  }

  handleMAChange=(value)=>{
    this.setState({
      accModVal:value
    })
  }

  //Set Page
  setActivePage=(e)=>{
    e.preventDefault()       
    this.props.setActivePage(e.target.getAttribute('data-pagename'))
  }

  //Save Button
  formSubmit=(e)=>{
      e.preventDefault()  
      const sb = this.state.subject
      if (sb === null){
        alert("Please insert/ select subject for your new activity")
        // <Alert color="warning">This is a warning alert — check it out!</Alert>
        // this.alert()
      }
      else{

      const {user:{bio_access_id:bId}} = this.props.session
      const {additional_tasks} = this.state
      const { 
        stakehValAssignorNew,
        stakehValAssigneeNew,
        stakehValSupervisorNew,
        stakehValManagerNew,
        hasDecision,
        prevTaskNew,
        nextTaskNew,
        accViewVal,
        accUpdVal,
        accRmvVal,
        accModVal,
        addTaskTitle,
        title,
        subject,
        instruction,
        estimated_duration,
        is_important,
        is_auto_start,
        acl_id,
        task_id
      } = this.state
      e.preventDefault()

      const newActObj={
        task_id:task_id,
        title: title,
        subject: subject.value,
        instruction: instruction,
        estimated_duration: parseInt(estimated_duration),
        is_important: is_important,
        is_auto_start: is_auto_start,
        default_assignor_id: stakehValAssignorNew.value,
        default_assignor_name: stakehValAssignorNew.label,
        default_assignee_id:stakehValAssigneeNew.value,
        default_assignee_name: stakehValAssigneeNew.label,
        default_supervisor_id: stakehValSupervisorNew.value,
        default_supervisor_name: stakehValSupervisorNew.label,
        default_manager_id: stakehValManagerNew.value,
        default_manager_name: stakehValManagerNew.label,
        parent_id: null,
        prev_task_id: prevTaskNew.value,
        prev_task_title: prevTaskNew.label,
        additional_tasks: additional_tasks,
        next_task_id: nextTaskNew.value,
        next_task_title: nextTaskNew.label,
        is_decision: hasDecision,
        task_results: [],
        acl_id: acl_id,
        acl_entries: this.Aclselected(),

        email_template_id: null,
        recipients: [],
        include_assignee: false,
        include_home: false,
        include_owner: false,
        include_stakeholders: false,
        stakeholder_fields: [],
        is_enable_auto_scripting: false,
        auto_scripting: null,
        bio_access_id: bId,
        action: "SAVE_TASK" 

      }        
      this.props.addNewActivity(newActObj)
      console.log(newActObj)
      alert("Successful Created")
    }
  }

  //ACL
  Aclselected=()=>{
    const {accViewVal, accUpdVal, accRmvVal, accModVal} = this.state    
    
    // console.log(accViewVal)

    const viewSource = accViewVal.map(item =>({
        stakeholder_id: item.value,
        stakeholder_name: item.label,
        stakeholder_type_id: item.value,
        attach: false,
        modify_access: false,
        remove: false,
        remove_child: false,
        update: false,
        update_child: false,
        view: true,
        view_child: false,
        index: -1,
        depth: 0,
        expanded: false,
        expandable: true,
        checked: null,
        leaf: false,
        cls: null,
        iconCls: null,
        icon: null,
        root: false,
        isLast: false,
        isFirst: false,
        allowDrop: true,
        allowDrag: true,
        loaded: false,
        loading: false,
        href: null,
        hrefTarget: null,
        qtip: null,
        qtitle: null,
        qshowDelay: 0,
        children: null
    }))       

    // console.log(viewSource)   
    const update = this.acl_builder(accUpdVal, viewSource, 'update')    
    // console.log(update)    
    const remove = this.acl_builder(accRmvVal, update, 'remove')
    // console.log(remove)   
    const modAcl = this.acl_builder(accModVal, remove, 'modify_access')
    // console.log(modAcl)                        

    if (modAcl === undefined)
    {
        // modAcl = null  
        this.setState({
            acl_id:null
        })           
    }

    // console.log(modAcl) 

    return modAcl
}

///////////////////////////////////recursive function//////////////////////////////////////////
acl_builder=(selData,aclEntries,type)=>{  
    // console.log(selData)         
    // console.log(aclEntries)          
    selData.map(item=>
       { const TargetItem = aclEntries.findIndex(rec=>rec.stakeholder_id===item.value) 
        // console.log(TargetItem)
        if ( TargetItem!==-1) {
            aclEntries[TargetItem][type] = true
        } 
        else {
            var aclObj =
                {                             
                    stakeholder_id: null,
                    stakeholder_name: null,
                    stakeholder_type_id: null,
                    attach: false,
                    modify_access: false,
                    remove: false,
                    remove_child: false,
                    update: false,
                    update_child: false,
                    view: false,
                    view_child: false,
                    index: -1,
                    depth: 0,
                    expanded: false,
                    expandable: true,
                    checked: null,
                    leaf: false,
                    cls: null,
                    iconCls: null,
                    icon: null,
                    root: false,
                    isLast: false,
                    isFirst: false,
                    allowDrop: true,
                    allowDrag: true,
                    loaded: false,
                    loading: false,
                    href: null,
                    hrefTarget: null,
                    qtip: null,
                    qtitle: null,
                    qshowDelay: 0,
                    children: null
                }
        aclObj.stakeholder_id= item.value  
        aclObj.stakeholder_name=  item.label  
        aclObj.stakeholder_type_id= item.type  
        aclObj[type]=true
        aclEntries.push(aclObj)
        }              
    })          
    return aclEntries   
}

    

  render() {
    const {stakehList} = this.props.stakeholderList
    const {listWorflowbySub, addTask} = this.props.crtNewReducer
    const optionStakehList = stakehList.map((itm => ({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)})))
    
    const {subject, stakehValAssigneeNew, stakehValAssignorNew, stakehValManagerNew, stakehValSupervisorNew, hasDecision, accViewVal,accUpdVal,accRmvVal,
      accModVal, prevTaskNew, hasError, nextTaskNew, resultTitle, resultStatus, task_results, additional_tasks, addTitle
    } = this.state
     
    console.log(additional_tasks)
    const {listofSubjectObj,listSub} = this.props.listWrkFlw   
    const optionListItemBySubject = listofSubjectObj.map((itm => ({ value: decodeURIComponent(itm.subject), label:decodeURIComponent(itm.subject)})))
    const optionListItemByTitle = listSub.map((itm => ({ label:decodeURIComponent(itm.title), value:decodeURIComponent(itm.task_id)})))
    const listbySubject = listWorflowbySub.map((itm => ({ value: decodeURIComponent(itm.task_id), label:decodeURIComponent(itm.title)})))
    const addSubject = listWorflowbySub.map((itm => ({ value: decodeURIComponent(itm.task_id), label:decodeURIComponent(itm.title)})))
    const AddTask = additional_tasks.map(itm=>itm.task_title)

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Activity</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/management.svg')} className=" img-dash" alt="activityImage" />
                        </div>
                    </div>

                    <input hidden="hidden" type="text"  className="form-control" disabled/>

                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">

                    {/* Basic */}
                    <div className="border">
                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_important" type="checkbox" onChange={this.handleChange}/> Is important
                          </label>
                        </div>

                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_auto_start" type="checkbox" onChange={this.handleChange}/> Auto Start
                          </label>
                        </div>
                      </div>
                    </div>

                <div className="col">
                    <div className="row" >
                        <div className="form-group col">
                          <label>Subject</label>
                          <Select
                              // required={true}
                              className="basic-single"
                              onChange={this.handleSubjectChange}
                              options={optionListItemBySubject}
                              value={subject}
                              isClearable
                              isSearchable
                              isRequired/>   
                              
                              </div>
                        </div>

                        <div className="form-group">
                          <label>Title</label>
                            <input  name="title" type="text" className="form-control" onChange={this.handleTextChange} required/> 
                        </div>

                        <div className="form-group">
                          <label>Instruction</label>
                            <textarea name="instruction" rows="4" cols="50" className="form-control" onChange={this.handleTextChange} /> 
                        </div>

                        <div className="form-group">
                          <label>Duration(days)</label>
                            <input name="estimated_duration"  type="number" className="form-control" min="0" onChange={this.handleTextChange}/> 
                        </div>

                      
                      {/* stakeholder */}
                      <div className="row form-group">

                        <div className="col-sm-6 form-group">
                          <label>Assignee</label>
                            <Select
                              className="basic-single"
                              onChange={this.handleAssignorChange}
                              options={optionStakehList}
                              value={stakehValAssignorNew}
                              isClearable
                            />
                        </div>

                        <div className="col-sm-6 form-group">
                          <label>Assignee</label>
                            <Select
                              className="basic-single"
                              onChange={this.handleAssigneeChange}
                              options={optionStakehList}
                              value={stakehValAssigneeNew}
                              isClearable
                            />
                        </div>
                      </div>

                      <div className="row form-group">

                        <div className="col-sm-6 form-group">
                          <label>Supervisor</label>
                            <Select
                              className="basic-single"
                              onChange={this.handleSupervisorChange}
                              options={optionStakehList}
                              value={stakehValSupervisorNew}
                              isClearable
                            />
                        </div>

                        <div className="col-sm-6 form-group">
                          <label>Manager</label>
                            <Select
                              className="basic-single"
                              onChange={this.handleManagerChange}
                              options={optionStakehList}
                              value={stakehValManagerNew}
                              isClearable
                            />
                          </div>
                      </div>

                    {/* task */}
                        <div className="row form-group">
                            
                            <div className="col form-group">
                                <label>Previous Task</label>
                                <Select
                              className="basic-single"
                              onChange={this.handlePrevTaskChange}
                              options={subject===""?"":listbySubject}
                              value={prevTaskNew}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Next Task</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={subject===""?"":listbySubject}
                              value={nextTaskNew}
                              isClearable
                            />
                            </div>
                        </div>

                    {/* Additional Task */}
                    <div className="row">
                      <div className="col-auto mr-auto form-group ">
                          <label>Additional Task (Title)</label>        
                      </div>

                      <div className="col-auto">                        
                          <span>
                              <Tooltip                            
                                  overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add Additional Task</div>}
                                  arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                  <img src={require('../../../img/addTask.svg')} alt="addTask"  className='btn btn-link' onClick={this.handleAddRowAdditionalTask}/>
                              </Tooltip>
                          </span>                         
                      </div>    
                    </div>    

                        
                    <table className={additional_tasks.length!==0?"table table-hover mb-3":"d-none"}>
                      <thead>
                          <tr>
                              <th scope="col">No.</th>
                              <th scope="col">Additional Task: Title</th>                                                                        
                          </tr>
                      </thead>
                              
                      <tbody>
                          {additional_tasks.map((itm,idx)=> (  
                          <tr key={idx}>
                              <td>{itm.sort_order}</td>
                              <td>
                                  <Select                                         
                                      options={optionListItemByTitle.filter(itm=> AddTask.includes(itm.label)< 1)}
                                      name="addTask"
                                      onChange={this.handleAdditionalTask(idx)}                                         
                                      value={addTitle[idx]}                                        
                                      placeholder="Title"                                                    
                                  />
                              </td>
                              <td>
                                  <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={this.handleRemoveSpecificAddtionalTaskRow(idx)}
                              >
                              Remove                        
                              </button>
                          </td>                                                                                 
                          </tr>  
                      ))}                              
                      </tbody>
                    </table>
          
                        {/* Task Result */}
                        <div className="row form-group">
                                <div className="col-6 col-md-4 form-group">
                                    <label> <input name="is_decision" type="checkbox" onChange={this.handleChange} checked={hasDecision}/> Has Decision</label>
                                </div>
                        </div>
                                <div className={hasDecision===null||hasDecision=== false?"d-none":"autoUpdate row"}>
                                    <div className="col-sm-6 form-group">
                                        <label>Task Result: Status</label>
                                        <input type="text" name="taskResultStatus" className="form-control"  />
                                    </div>

                                    <div className="col-sm-6 form-group">
                                        <label>Task Result: Title</label>
                                        <input name="taskResultTitle" type="text" onChange={this.handleChange} className="form-control" />
                                    </div>
                                </div>

                        {/* ACL  */}
                        <div className="row form-group">

                            <div className="col form-group">
                                <label>View</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleViewChange}
                              options={optionStakehList}
                              value={accViewVal}
                              isClearable
                              isMulti
                            />
                            </div>
                            <div className="col form-group">
                                <label>Update</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleUpdateChange}
                              options={optionStakehList}
                              value={accUpdVal}
                              isClearable
                              isMulti
                            />                            
                            </div>
                        </div>

                        <div className="row">

                            <div className="col form-group">
                                <label>Remove</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleRemoveChange}
                              options={optionStakehList}
                              value={accRmvVal}
                              isClearable
                              isMulti
                            />                            
                            </div>
                            <div className="col form-group">
                                <label>Modify Access</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleMAChange}
                              options={optionStakehList}
                              value={accModVal}
                              isClearable
                              isMulti
                            />                            
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

NewActivityWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  stakeholderList: PropTypes.object.isRequired,
  workflowDetail:PropTypes.object.isRequired,  
  crtNewReducer:PropTypes.object.isRequired, 
  listWrkFlw:PropTypes.object.isRequired, 
  setItemListSubject:PropTypes.func.isRequired, 
  setListAddTask:PropTypes.func.isRequired, 
  addNewActivity: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      crtNewReducer:state.crtNewReducer,
      listWrkFlw:state.listWrkFlw,
      stakeholderList: state.stakeholderList,
})
  
export default connect(mapStateToProps, {setItemListSubject, setListAddTask, addNewActivity, setActivePage})(NewActivityWizard)
