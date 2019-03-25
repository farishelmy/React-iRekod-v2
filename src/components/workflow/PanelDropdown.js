import React, { Component } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { getDetails, activityName, activityUri } from '../../actions/workflowAction/workflowDetailAction'
import { panelContent} from '../../actions/workflowAction/authListWorkFlow'


 

class PanelDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {                        
          optionActivity:[],             
        }
    }      

    componentDidUpdate(prevProps){
        if(prevProps.listActivity.listActivity !== this.props.listActivity.listActivity){     
                 
          const {listActivity} = this.props.listActivity 

          const notStart = listActivity.filter(itm => itm.iconCls === "activity-not-start")
          const  groupNotStart = notStart.map((item)=> ({value:item.activityUri, label:item.activityName}))              

          const  overdue = listActivity.filter(itm => itm.iconCls === "activity-overdue" )
          const  groupOverdue = overdue.map((item)=> ({value:item.activityUri, label:item.activityName}))    
          
          const  complete = listActivity.filter(itm => itm.iconCls === "activity-complete" )
          const  groupComplete = complete.map((item)=> ({value:item.activityUri, label:item.activityName}))       




          const act = [
            {
              label: 'Complete',
              options: groupComplete,
            },

            {
              label: 'Started',
              options: groupOverdue,
            },

            {
              label: 'Not Ready To Start',
              options: groupNotStart,
            },


          ]

          this.setState({
            optionActivity: act,
          })

          // const act = listActivity.map((item,idx)=> ({value:item.activityUri, label:item.activityName}))           
          // this.setState({
          //     optionActivity: act,
          // })

        }         
    }

    

    handleChange = (value) => {
      const { user: { _id: bId } } = this.props.session
      const { workflowName, panelContent  } = this.props.listWorkflow
         
         
      this.setState({ selectActivity: value.label})  

      const param ={
        _action: "SEARCHACTIVITY",
        activityName: value.label,
        workflowName: workflowName,
        assignedTo:  null,
        supervisor:  null,
        escalatedTo:  null,
        dueDateFrom:  null,
        dueDateTo:  null,
        startDateFrom: null,
        startDateTo: null,
        completeDateFrom:  null,
        completeDateTo:  null,
        excludeActivityNotStart: null,
        excludeCompletedActivity: null,
        _id: bId
      }
      this.props.getDetails(param) //Set Workflow Details
      this.props.activityUri(value.value)  //Set Workflow Uri
      this.props.activityName(value.label)  //Set Workflow Name
      this.props.panelContent(false)

    }

   

     

  render() {       



    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    };

    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    
    return (
     
      <Select
          className="basic-single"
          onChange={this.handleChange}
          options={this.state.optionActivity}
          placeholder="Select Activity"    
          formatGroupLabel={formatGroupLabel}         
      />
      
    )
  }
}

PanelDropdown.propTypes={
    session: PropTypes.object.isRequired, 
    listActivity: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    breadcrumb: PropTypes.object.isRequired, 
    getDetails: PropTypes.func.isRequired, 
    activityName: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired,
    panelContent: PropTypes.func.isRequired,
    
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    listActivity:state.listActivity,
    listWorkflow: state.listWorkflow,
    breadcrumb: state.breadcrumb 
    
  })
export default connect(mapStateToProps,{
    getDetails,
    activityName,
    activityUri,
    panelContent
   

})(PanelDropdown)