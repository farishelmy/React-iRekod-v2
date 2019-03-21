import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName, panelContent } from '../../actions/workflowAction/authListWorkFlow'
import { setRecordStore, setListActivity } from '../../actions/workflowAction/workflowDetailAction'
import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabWorkflow'
// import Search from '../modal/ModalWorkflow'
import CardView from '../workflow/CardView'
import ListView from '../workflow/ListView'
import WorkflowPanel from '../workflow/WorkflowPanel'
import SidePanel from '../workflow/SidePanel'
import ActivityPanel from '../workflow/ActivityPanel'



import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class WorkflowContent extends Component {

    constructor() {
        super()
        this.state = {
            workList: [],
            tabWorkflow: false,
            tabReadyToStart: false,
            tabIncomplete: false,

        }

    }
 

    toggleClass = (e) => {
        e.preventDefault()
        switch (e.target.name) {
          case 'workflow':
            const workflowState = this.state.tabWorkflow
            this.setState({ tabWorkflow: !workflowState, tabReadyToStart: false, tabIncomplete: false })
            break
          case 'readyToStart':
            const readyStartState = this.state.tabReadyToStart
            this.setState({ tabReadyToStart: !readyStartState, tabWorkflow: false, tabIncomplete: false })
            break
          case 'Incomplete':
            const incompleteState = this.state.tabIncomplete
            this.setState({ tabIncomplete: !incompleteState, tabWorkflow: false, tabReadyToStart: false })
            break
          default:
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

    render() {

        const { cardView, showFab, workflowDetails, panelContent } = this.props.listWorkflow
        const { workList,  tabWorkflow, tabReadyToStart, tabIncomplete } = this.state

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
                            <div className="col-lg-3">
                                <SidePanel/>
                            </div>

                            <div className="col-lg-9">    
                                { 
                                    panelContent === true ? 
                                    <WorkflowPanel/>
                                    :
                                    <ActivityPanel/>
                                }   
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
    panelContent: PropTypes.func.isRequired,
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
        panelContent

    })(WorkflowContent)

