import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName } from '../../actions/workflowAction/authListWorkFlow'
import { setRecordStore, setListActivity } from '../../actions/workflowAction/workflowDetailAction'
import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabWorkflow'
// import Search from '../modal/ModalWorkflow'
import CardView from '../workflow/CardView'
import ListView from '../workflow/ListView'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class ActivityPanel extends Component {

    constructor() {
        super()
        this.state = {          

        }

    }     

    render() {

        const { cardView, showFab, workflowDetails } = this.props.listWorkflow
        const { listActivity } = this.props.listActivity

        return (
            <Fragment>

            {listActivity.map((item,idx) =>   
               
                <div key={idx} className="card">
                        <div className="card-header">
                            <small className="float-right text-muted">{item.workflowName}</small>
                            <h3 className="card-title">{item.activityName}</h3>
                        </div>
                        <div className="card-body">                                           
                            <div className="media"><span style={{backgroundImage: `url(${require('../../img/Icon/'+item.iconCls+'.svg')})` }} className="img-card mr-3"></span>
                                <div className="media-body">     
                                    <p className="text-muted mb-0"><label className="text-body">Supervisor:</label> {item.assignedTo}</p>
                                    <p className="text-muted mb-0"><label className="text-body">Priority:</label> {item.priority}</p>   
                                    <p className="text-muted mb-0"><label className="text-body">Date Start:</label> {item.activityDateDue}</p>    
                                    <p className="text-muted mb-0"><label className="text-body">Date Due:</label> {item.estDuration}</p>   
                                                                       
                                    <button className="btn btn-sm btn-primary" onClick={this.btnDetails}>
                                        Details
                                    </button>                                                                            
                                
                                    <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                        Records
                                    </button>

                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Complete</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/complete.svg')} alt="Edit Details" data-pagename="edit" className='img-icon ml-2 mr-2' onClick={this.updDetail}/>
                                    </Tooltip>  

                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Assign</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/assign.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-2' onClick={this.updDetail}/>
                                    </Tooltip>   
                                    
                                </div>
                            </div>
                        </div>                                      
                </div> 

            )}    
            </Fragment>
        )
    }
}

ActivityPanel.propTypes = {
    session: PropTypes.object.isRequired,
    listActivity: PropTypes.object.isRequired,
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
}
const mapStateToProps = state => ({
    session: state.session,
    listWorkflow: state.listWorkflow,
    listActivity: state.listActivity,

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
        setWorkflowName

    })(ActivityPanel)

