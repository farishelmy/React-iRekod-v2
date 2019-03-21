import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName, panelContent } from '../../actions/workflowAction/authListWorkFlow'
import { setRecordStore} from '../../actions/workflowAction/workflowDetailAction'
import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabWorkflow'
// import Search from '../modal/ModalWorkflow'
import CardView from '../workflow/CardView'
import ListView from '../workflow/ListView'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class SidePanel extends Component {

    constructor() {
        super()
        this.state = {
            workList: [],
            tabWorkflow: true,
            tabReadyToStart: false,
            tabIncomplete: false,
        }
    }

    toggleClass = (e) => {
        e.preventDefault()      
        switch (e.target.getAttribute('name'))
        {
          case 'workflow':
            const workflowState = this.state.tabWorkflow
            this.props.panelContent(true)

            if (workflowState !== true ){
                this.setState({ tabWorkflow: !workflowState, tabReadyToStart: false, tabIncomplete: false })
            }
            break

          case 'ready':
            const { user: { _id: bId }} = this.props.session
            const readyState = this.state.tabReadyToStart
            const {panelContent, wrkflSel} = this.props.listWorkflow

            this.props.panelContent(false)

            if (readyState !== true ){               
                this.setState({ tabReadyToStart: !readyState, tabIncomplete: false,  tabWorkflow: false  })
            }
            break
          case 'incomplete':
            const incompleteState = this.state.tabIncomplete
            if (incompleteState !== true ){
                this.setState({ tabIncomplete: !incompleteState,  tabReadyToStart: false, tabWorkflow: false })
            }
            break
          default:
        }
      }

    

    



    
     


    render() {

        const { cardView, showFab, workflowDetails } = this.props.listWorkflow

        const { workList,  tabWorkflow, tabReadyToStart, tabIncomplete } = this.state

        



        return (
            <Fragment>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Workflow</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                    
                        <li className={tabWorkflow?"list-group-item bg-primary":"list-group-item"}  onClick={this.toggleClass} name="workflow"> Workflow </li>                         

                    </ul>
                </div>      


                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Activity</h3>
                    </div>
                    <ul className="list-group list-group-flush">

                        <li className={tabReadyToStart?"list-group-item bg-primary":"list-group-item"}  onClick={this.toggleClass} name="ready"> All Activity </li>

                        {/* <li className={tabReadyToStart?"list-group-item bg-primary":"list-group-item"}  onClick={this.toggleClass} name="ready"> Ready To Start </li> */}

                        {/* <li className={tabIncomplete?"list-group-item bg-primary":"list-group-item"} onClick={this.toggleClass} name="incomplete"> Incomplete </li> */}

                    </ul>
                </div>
            </Fragment>
        )
    }
}

SidePanel.propTypes = {
    session: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    setCardView: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    setSelWorkFlow: PropTypes.func.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setRecordStore: PropTypes.func.isRequired,
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
        getDetails,
        setNewBread,
        setRecordStore,
        // setPageTitle,
        setWorkflowName,
        panelContent

    })(SidePanel)

