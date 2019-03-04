import React, { Component,Fragment } from 'react' 
// import {updStkh} from '../../actions/stakehUpdateAction'
import Select from 'react-select'

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

        
        }     
    }   
    
    componentWillMount(){
      const {activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration} = this.props.item
      this.setState({
        activityName:activityName,
        activityUri:activityUri,        
        workflowName:workflowName,
        assignedTo:assignedTo,
        activityDateDue:activityDateDue,
        icon:icon,
        supervisor:supervisor,
        priority:priority,
        estDuration:estDuration,
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
       // console.log(inputName)   
      //  console.log(inputVal)
  }    

    

    
  render() {

    const {activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration} = this.state
     
   
    
    
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
                                <input type="text" name="stakeh_type_name" className="form-control" value={activityName} disabled/>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label>Assigned To</label>
                                <input name="initials" type="text" placeholder="Mr / Mrs" className="form-control" onChange={this.handleChange} value={activityName}/> 
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Supervisor</label>
                                <input name="first_name" type="text" className="form-control" placeholder="Smith" value={activityName} onChange={this.handleChange} />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Estimate</label>
                                <input name="last_name" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={activityName}/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Priority</label>
                                <input name="full_name" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={activityName}/>
                            </div>                            
                            {/* <div className={pageTitle!=="User"?"col-sm-6 form-group":"col-sm-4 form-group"}>
                                <label>Date of Birth</label>
                                <DatePicker
                                    name="date_of_birth" 
                                    placeholderText="Date of Birth"
                                    className="form-control" 
                                    dateFormat="DD/MM/YYYY" 
                                    selected={date_of_birth!==null?moment(date_of_birth, "DD/MM/YYYY"):date_of_birth}  
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onChange={this.handleDateChange}/>                               
                            </div>                 */}
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
    listWorkflow:PropTypes.object.isRequired,
    
}

const mapStateToProps= state =>({
        session:state.session,
        layout:state.layout,
        
        listWorkflow:state.listWorkflow,
        
})
    
export default connect(mapStateToProps, 
    {
        

    })(GeneralWizard)