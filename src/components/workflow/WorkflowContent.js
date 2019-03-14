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


class WorkflowContent extends Component {

    constructor() {
        super()
        this.state = {
            workList: [],

        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.listWorkflow.listWorkflow !== this.props.listWorkflow.listWorkflow) {
            const { listWorkflow } = this.props.listWorkflow
            // console.log(listWorkflow)
            const listWkflw = listWorkflow.map(res => ({ ...res, isSel: false }))
            //  console.log(listWkflw)
            this.setState({
                workList: listWkflw
            })
        }
    }

    //Direct Page To WorkFlow Detail
    setActivePage = (FabRec) => {

        const { user: { _id: bId } } = this.props.session
        const { wrkflSel, workflowTemplate, workflowName } = this.props.listWorkflow

        // this.props.setPageSubject(workflowTemplate)
        this.props.setShowFab(false)
        this.props.setActivePage(FabRec)

        //Activity Wizard
        const workflowDet = {
            _action: 'SEARCHACTIVITY',
            workflowUri: wrkflSel,
            _id: bId,
        }

        this.props.setListActivity(workflowDet)

        //Record Wizard    
        const recordDet = {
            _id: bId,
            _action: "SEARCHRECORD",
            jsonQuery: JSON.stringify([{ "op": "EQUALS", "field": "%26%26Related+Records+of+Workflow", "value1": workflowName }]),
            searchOrder: "0"
        }
        // console.log(recordDet)
        this.props.setRecordStore(recordDet)

        //Breadcrumb
        this.props.setNewBread(false, {
            id: wrkflSel,
            label: workflowName,
            activePage: 'viewWorkflow',
            isActive: true,
        })
    }


    //Selection
    markOnSel = (workflowName, markOnSel, workflowUri, isSel, supervisor, icon, dateStart, dateDue, jobNo, priority) => {

        const { user: { _id: bId } } = this.props.session
        const val = [{ workflowName, markOnSel, workflowUri, isSel, supervisor, icon, dateStart, dateDue, jobNo, priority }]

        this.props.getDetails(val) //Set Workflow Details
        this.props.setSelWorkFlow(workflowUri)  //Set Workflow Uri
        this.props.setWorkflowName(workflowName)  //Set Workflow Name   

        const { workList } = this.state
        // console.log({workList} )
        const itmIdx = workList.findIndex(itm => itm.workflowUri === workflowUri)
        const desIdx = workList.findIndex(itm => itm.isSel === true)

        const newWrkfwList = desIdx === -1 ?
            update(workList, {
                [itmIdx]: { isSel: { $set: true } }
            })
            : update(workList, {
                [itmIdx]: { isSel: { $set: true } },
                [desIdx]: { isSel: { $set: false } }
            })
        // // select
        if (itmIdx === desIdx) {
            this.props.setShowFab(false)
            this.props.setSelWorkFlow(null)


        }
        else {
            this.props.setShowFab(true)
        }

        this.setState({
            workList: newWrkfwList

        })
    }

    //Change view Card and List
    changeToViewCard = (e) => {
        const { cardView } = this.props.listWorkflow
        this.props.setCardView(!cardView)
    }





    render() {

        const { cardView, showFab, workflowDetails } = this.props.listWorkflow

        const { workList } = this.state





        return (
            <Fragment>

                <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <Breadcrumb />
                    </div>
                </div>

                
        {workflowDetails.map((item,idx) =>   

                <section key={idx} className="forms">
                    <div className="container-fluid">
                        <header>
                            <h1 className="h3 display "><strong>Workflows</strong></h1>
                        </header>

                        <div className="row">

                            <div className="col-lg-4">
                                
                            <div class="card">
                                <div class="card-body">
                                <div class="media"><span style={{backgroundImage: `url(${require('../../img/Icon/'+item.icon+'.svg')})` }} class="img-card mr-3"></span>
                                    <div class="media-body">
                                    <h4>{item.workflowName}</h4>
                                    <p class="text-muted mb-0">Coder</p>                                     
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Activity</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row mb-3">

                                    
                                    </div>
                                </div>



                            </div>


                            </div>                          

                            <div className="col-lg-8">
                                

                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">My Profile</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">Full Name</label>
                                                <input type="text"  placeholder="First name" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">User Type</label>
                                                <input type="text" placeholder="User Type" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="card-footer text-right">
                                            <button className="btn btn-primary">Save</button>
                                        </div>
                                    </div>

                                 
                            </div>
                        </div>





                    </div>
                </section>
                   ) } 
            </Fragment>
        )
    }
}

WorkflowContent.propTypes = {
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
        setWorkflowName

    })(WorkflowContent)

