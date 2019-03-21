import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName } from '../../actions/workflowAction/authListWorkFlow'
import { setRecordStore, setListActivity, setWizardPage } from '../../actions/workflowAction/workflowDetailAction'
import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabWorkflow'
// import Search from '../modal/ModalWorkflow'
import CardView from '../workflow/CardView'
import ListView from '../workflow/ListView'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class WorkflowPanel extends Component {

    constructor() {
        super()
        this.state = {
            workList: [],

        }

    }         

    //Direct Page To WorkFlow Detail
    setActivePage = () => {
        const {
        user: { _id: bId }} = this.props.session;
        const { wrkflSel, workflowTemplate, workflowName } = this.props.listWorkflow;

        this.props.setShowFab(false)
        this.props.setActivePage("viewWorkflow")
        this.props.setWizardPage("general")

        //Activity Wizard
        const workflowDet = {
        _action: "SEARCHACTIVITY",
        workflowUri: wrkflSel,
        _id: bId
        }
        
        this.props.setListActivity(workflowDet);

        //Record Wizard
        const recordDet = {
        _id: bId,
        _action: "SEARCHRECORD",
        jsonQuery: JSON.stringify([
            {
            op: "EQUALS",
            field: "%26%26Related+Records+of+Workflow",
            value1: workflowName
            }
        ]),
        searchOrder: "0"
        };
        // console.log(recordDet)
        this.props.setRecordStore(recordDet);

        //Breadcrumb
        this.props.setNewBread(false, {
        id: wrkflSel,
        label: workflowName,
        activePage: "viewWorkflow",
        isActive: true
        });
    }

   
     


    render() {

        const { cardView, showFab, workflowDetails } = this.props.listWorkflow

        const { workList } = this.state





        return (
            <Fragment>

            {workflowDetails.map((item,idx) =>   
               
                <div key={idx} className="card">
                        <div className="card-header">
                            <h3 className="card-title">{item.workflowName}</h3>
                        </div>
                        <div className="card-body">                                           
                            <div className="media"><span style={{backgroundImage: `url(${require('../../img/Icon/'+item.icon+'.svg')})` }} className="img-card mr-3"></span>
                                <div className="media-body">     
                                    <p className="text-muted mb-0"><label className="text-body">Supervisor:</label> {item.supervisor}</p>
                                    <p className="text-muted mb-0"><label className="text-body">Priority:</label> {item.priority}</p>   
                                    <p className="text-muted mb-0"><label className="text-body">Date Start:</label> {item.dateStart}</p>    
                                    <p className="text-muted mb-0"><label className="text-body">Date Due:</label> {item.dateDue}</p>   
                                    {/* <Tooltip      
                                        placement="top"                      
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Update Details</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/edit.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>   
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Assign</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/assign.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>   
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Records</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/fab-move.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Complete</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/complete.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>  
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Activity</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/activity.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>                                                   */}
                                    
                                    <button className="btn btn-sm btn-primary" onClick={this.setActivePage}>
                                        Details
                                    </button>

                                    <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                        Activity
                                    </button>                                                
                                
                                    <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                        Records
                                    </button>
                                    
                                </div>
                            </div>
                        </div>                                      
                </div> 

            )}    
            </Fragment>
        )
    }
}

WorkflowPanel.propTypes = {
    session: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    setCardView: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    setSelWorkFlow: PropTypes.func.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setRecordStore: PropTypes.func.isRequired,
    setListActivity: PropTypes.func.isRequired,
    setNewBread: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    session: state.session,
    listWorkflow: state.listWorkflow,

})
export default connect(mapStateToProps,
    {
        setActivePage,
        setCardView,
        setSelWorkFlow,
        setShowFab,
        setListActivity,
        getDetails,
        setNewBread,
        setRecordStore,
        // setPageTitle,
        setWorkflowName,
        setWizardPage,

    })(WorkflowPanel)

