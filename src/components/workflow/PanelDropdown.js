import React, { Component } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { setSelectAct, titleActivitySel } from '../../actions/workflowAction/workflowDetailAction'
import { panelContent} from '../../actions/workflowAction/authListWorkFlow'


 

class PanelDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {                        
          optionActivity:[], 
          start:[],  
          complete:[],
          overdue:[],
          notStart:[],
          suspend:[]  
        }
    }      

    componentDidUpdate(prevProps){
        if(prevProps.listActivity.listActivity !== this.props.listActivity.listActivity){     
                 
          const {listActivity} = this.props.listActivity 

          const start = listActivity.filter(itm => itm.iconCls === "activity-start")       

          const notStart = listActivity.filter(itm => itm.iconCls === "activity-not-start")       

          const overdue = listActivity.filter(itm => itm.iconCls === "activity-overdue")

          const complete = listActivity.filter(itm => itm.iconCls === "activity-complete") 

          const suspend = listActivity.filter(itm => itm.iconCls === "activity-suspend")        

          
          // const act = [           
          //   {
          //     label: 'Started',
          //     options: [
          //       {value:"start", label:"Activity Started"}
          //     ]   
          //   },  
            
          //   {
          //     label: 'Activity Overdue',
          //     options: [
          //       {value:"overdue", label:"Activity Overdue"}
          //     ]   
          //   }, 
           
          //   {
          //     label: 'Activity Not Ready To Start',
          //     options: [
          //       {value:"NotStart", label:"Activity Not Ready To Start"}
          //     ]       
          //   },

          //   {
          //     label: 'Activity Suspend',
          //     options: [
          //       {value:"suspend", label:"Activity Suspend"}
          //     ]       
          //   },

          //   {
          //     label: 'Activity Complete',
          //     options: [
          //       {value:"Complete", label:"Activity Complete"}
          //     ]       
          //   },             

          // ]

          const act = [           
            {
              label: 'Activity Started',
              value:"start"              
            },  
            
            {
              label: 'Activity Overdue',
              value: "overdue", 
            }, 
           
            {
              label: 'Activity Not Ready To Start',
              value:"NotStart"   
            },

            {
              label: 'Activity Suspend',
              value:"suspend"                     
            },

            {
              label: 'Activity Complete',
              value:"Complete"                   
            },             

          ]

          this.setState({
            optionActivity: act,
            start:start,
            notStart:notStart,
            overdue:overdue,
            complete:complete,
            suspend:suspend
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

      const { optionActivity, notStart, overdue, complete, start, suspend } = this.state 
      
      if(value.label === "Activity Not Ready To Start"){ 
        this.props.setSelectAct(notStart)         
        this.props.panelContent(false)
      }

      if(value.label === "Activity Started"){ 
        this.props.setSelectAct(start)       
        this.props.panelContent(false)
      }  
      
      if(value.label === "Activity Complete"){ 
        this.props.setSelectAct(complete)        
        this.props.panelContent(false)
      }

      if(value.label === "Activity Overdue"){ 
        this.props.setSelectAct(overdue)        
        this.props.panelContent(false)
      }

      if(value.label === "Activity Suspend"){ 
        this.props.setSelectAct(suspend)        
        this.props.panelContent(false)
      }
      
      this.props.titleActivitySel(value.label)
      this.setState({ selectActivity: value.label})  

    }

  render() {         

    return (
     
      <Select
          className="basic-single"
          onChange={this.handleChange}
          options={this.state.optionActivity}
          placeholder="Select Activity"                  
      />
      
    )
  }
}

PanelDropdown.propTypes={
    session: PropTypes.object.isRequired, 
    listActivity: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    breadcrumb: PropTypes.object.isRequired,     
    panelContent: PropTypes.func.isRequired,
    setSelectAct: PropTypes.func.isRequired,
    titleActivitySel: PropTypes.func.isRequired,   
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    listActivity:state.listActivity,
    listWorkflow: state.listWorkflow,
    breadcrumb: state.breadcrumb 
    
  })
export default connect(mapStateToProps,{
    panelContent,
    setSelectAct,
    titleActivitySel
   

})(PanelDropdown)