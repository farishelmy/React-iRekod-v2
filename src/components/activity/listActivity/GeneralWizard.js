import React, { Component,Fragment } from 'react' 
 
import Select from 'react-select'
// import duration from 'bootstrap-duration-picker'

import 'rc-checkbox/assets/index.css'
import { Button } from 'reactstrap'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class GeneralWizard extends Component {
    constructor(){
        super()
        this.state={
            activityName:null,
            activityUri:null,
            markOnSel:null,
            workflowName:null,
            assignedTo:null,
            activityDateDue:null,
            icon:null,
            supervisor:null,
            priority:null,
            estDuration:null,
            stakehList:[],
            priorityOption:[
                {value: "Very High" ,label: "Very High" },
                {value: "High" ,label: "High"},
                {value: "Medium" , label: "Medium"},
                {value:  "Low" ,label: "Low"},  
                {value: "Very Low" ,label: "Very Low"}                
            ],      

        
        }     
    }   
    
    componentWillMount(){
      const {activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration} = this.props.item
      const {stakehType}=this.props.stakeholderlistType   
      const stakehOptions = stakehType.map(itm=>({ value: itm.uri, label:itm.Name}))
      const priorityVal = ({value: priority, label: priority})
      this.setState({
        activityName:activityName,
        activityUri:activityUri,        
        workflowName:workflowName,
        assignedTo:assignedTo,
        activityDateDue:activityDateDue,
        icon:icon,
        supervisor:supervisor,
        priority:priorityVal,
        estDuration:estDuration,
        stakehList:stakehOptions,
      })
    }    

    handleChange=(e)=>{
      const inputName = e.target.getAttribute('name')
      const inputVal =  e.target.value
      // ===""?e.target.value=null:e.target.value  
      // console.log(e.target.value)    
  
    this.setState({
        [inputName]:inputVal
      })  
    //    console.log(inputName)   
    //    console.log(inputVal)
    }   
    
    handleAssignTo=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({assignedTo:param})
        // console.log(param)
    }

    handleSupervisor=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({supervisor:param})
        // console.log(param)
    }

    handlePriority=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({priority:param})
        // console.log(param)
    }

    

    

    
  render() {

    const {activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration,stakehList,priorityOption} = this.state
     
   
    
    
    return (
        <Fragment>
        <h1 className="h3 display text-primary text-center">General</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center mt-5">
                            <img src={require('../../../img/management.svg')} alt="management" className=" img-dash" />
                        </div>
                    </div>  
                   
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="form-group">
                            <label>Activity Name</label>
                                <input type="text" name="activityName" className="form-control" placeholder="Name" onChange={this.handleChange} value={activityName} />
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label>Assigned To</label>
                                <Select 
                                    name="assignedTo"
                                    options={stakehList}
                                    onChange={this.handleAssignTo}
                                    value={assignedTo===""?null:assignedTo} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Supervisor</label>
                                <Select 
                                    name="supervisor"
                                    options={stakehList}
                                    onChange={this.handleSupervisor}
                                    value={supervisor===""?null:supervisor} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Estimate</label>
                                <input name="estDuration" type="text" id="Duration" className="form-control" placeholder="Date" onChange={this.handleChange} value={estDuration}/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Priority</label>
                                <Select 
                                    name="priority"
                                    options={priorityOption}
                                    onChange={this.handlePriority}
                                    value={priority===""?null:priority} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>                           
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Save</button>                   
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>
            </form>                
      </Fragment>
    )
  }
}
GeneralWizard.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,      
    listWorkflow: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    
}

const mapStateToProps= state =>({
        session:state.session,
        layout:state.layout,
        stakeholderlistType:state.stakeholderlistType,
        listWorkflow:state.listWorkflow,
        
})
    
export default connect(mapStateToProps, 
    {
        

    })(GeneralWizard)