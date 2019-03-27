import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeSubBtn } from '../../actions/fabAction'
import { setActivePage } from "../../actions/layoutInitAction"
import { setWizardPage, setRecordStore } from "../../actions/workflowAction/workflowDetailAction"
import { setNewBread } from "../../actions/breadcrumbAction"
import { toggleErr, showComplete } from '../../actions/activityAction/listActivity/modal'
import { getResult } from '../../actions/activityAction/listActivity/listActivityAction'

import ReassignModal from '../activity/listActivity/modal/ReassignModal'
import CompleteModal from '../activity/listActivity/modal/CompleteModal'


class FabActivityContent extends Component {

    constructor() {
        super()
        this.state = {          
            result:[]
        }

    }     
       

    action=(e)=>{
        e.preventDefault()

        const {  activityUri } = this.props.listActivity
        const { user: { _id: bId }} = this.props.session

        switch(e.target.name){
            

            case 'enableSubBtn':
                // console.log('enableMulti')
                this.props.changeSubBtn(true)
            break

            case 'disableSubBtn':
                // console.log('disable multi')
                this.props.changeSubBtn(false)
            break

            case 'records':
                
                // const recordDet = {
                //     _id: bId,
                //     _action: "SEARCHRECORD",
                //     jsonQuery: JSON.stringify([
                //       {
                //         op: "EQUALS",
                //         field: "%26%26Related+Records+of+Workflow",
                //         value1: workflowName
                //       }
                //     ]),
                //     searchOrder: "0"
                //   }
                  
                // this.props.setRecordStore(recordDet)
                this.props.setActivePage('viewAct')
                this.props.setWizardPage("record") 
           
            break   

            case 'details':                
                
                this.props.setActivePage('viewAct')
                this.props.setWizardPage("general") 
                this.props.changeSubBtn(false)                   
                
            break   

            case 'assign':                
                
                this.props.toggleErr(true)               
                  
            break   

            case 'complete':                
                this.props.showComplete(true)      
                
                const param ={
                    _action: "GETRESULT",
                    _activityUri: activityUri, 
                    _id: bId,
                }
                this.props.getResult(param)

                
                
             
                
                
            break   

            default:
                // this.props.stakehAction(e.target.name)                 
            break

        }
    } 


  render() {
      const {showSubBtn} = this.props.listWorkflow
      
    

    return (
        <section>
        <div className="fab">
            <span className={!showSubBtn?"fab-action-button":"d-none"}>
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Action</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                    <img name="enableSubBtn" src={require('../../img/fab-multi.svg')} alt='enableSubBtn' className='img-fluid' onClick={this.action}/>
                </Tooltip>
            </span>

            <span className={showSubBtn?"fab-action-button":"d-none"}>
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Close Action</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                    <img name="disableSubBtn" src={require('../../img/fab-multi-cancel.svg')} alt='disableSubBtn' className='img-fluid' onClick={this.action} />
                </Tooltip>
            </span>
            
        <ul className="fab-buttons">

            <li className={showSubBtn?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Complete</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="complete" src={require('../../img/complete.svg')} alt='complete' className='img-fluid' onClick={this.action} />
                    </Tooltip>
                </span>
            </li>   

            <li className={showSubBtn?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Assign</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="assign" src={require('../../img/user.svg')} alt='assign' className='img-fluid' onClick={this.action} />
                    </Tooltip>
                </span>
            </li>
            <li className={showSubBtn?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Records</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="records" src={require('../../img/fab-child.svg')} alt='records' className='img-fluid' onClick={this.action} />
                    </Tooltip>
                </span>
            </li>
 

            <li className={showSubBtn?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Details</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="details" src={require('../../img/fab-update.svg')} alt='details' className='img-fluid' onClick={this.action} />
                    </Tooltip>
                </span>
            </li>               

        </ul>
    </div>

    <ReassignModal/>
    <CompleteModal/>

    </section>
    )
  }
}

FabActivityContent.propTypes={
    session: PropTypes.object.isRequired,
    listActivity: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,    
    fab: PropTypes.object.isRequired,
    changeSubBtn:PropTypes.func.isRequired,
    setActivePage:PropTypes.func.isRequired,
    setWizardPage:PropTypes.func.isRequired,
    setNewBread:PropTypes.func.isRequired,
    setRecordStore:PropTypes.func.isRequired,
    toggleErr:PropTypes.func.isRequired,
    showComplete:PropTypes.func.isRequired,
    getResult:PropTypes.func.isRequired,
    
 
     
  }
const mapStateToProps = state => ({
    fab:state.fab,
    layout:state.layout,   
    listWorkflow:state.listWorkflow,
    session:state.session,
    listActivity:state.listActivity
})

export default connect(mapStateToProps,{
    changeSubBtn,
    setActivePage,
    setWizardPage,
    setNewBread,
    setRecordStore,
    toggleErr,
    showComplete,
    getResult
   

})(FabActivityContent)