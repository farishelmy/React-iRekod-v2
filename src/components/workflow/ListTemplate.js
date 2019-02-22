import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {workflowTemplate} from '../../actions/workflowAction/authListWorkFlow'
import Select from 'react-select'

class ListTemplate extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          dropdownOpen: false,
          selectedOption: []
        };
      }   
      
      // componentDidUpdate(prevProps){
      //   // console.log(prevProps.listWrkFlw.ListWorkflowTemplate!==this.props.listWrkFlw.ListWorkflowTemplate)
      //     if(prevProps.listWorkflow.ListWorkflowTemplate!==this.props.listWorkflow.ListWorkflowTemplate){
      //       const {listofSubjectObj,ListWorkflowTemplate} = this.props.listWorkflow
      //       // console.log(listofSubjectObj[0].subject)
      //       const listSub = ListWorkflowTemplate.filter(itm => itm.subject === listofSubjectObj[0].subject)
      //       this.setState({
      //         selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
      //       })
      //       this.props.listWorkFlowSub(listSub)
      //     }
        
      // }

      // componentWillMount(){
      //   const {listofSubjectObj,ListWorkflowTemplate} = this.props.listWorkflow
      //   console.log(ListWorkflowTemplate)
        
      //   const listSub = ListWorkflowTemplate.filter(itm => itm.template === listofSubjectObj[0].subject)
      //   // console.log(listSub)
      //   {listSub===null || listSub==''?
      //   this.setState({
      //     selectedOption:[{label : '', value: ''}]
      //   }):

      //   this.setState({
      //     selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
      //   })
      // }
      //   // this.setState({
      //   //   selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
      //   // })
      //   this.props.listWorkFlowSub(listSub)
      // }

      // getWorkFlow=(e)=>{
      //   console.log('111')
      //   const {ListWorkflowTemplate}=this.props.listWorkflow
      //   const nameworkflow = e.target.getAttribute('data-name')        
      //   const listSub = ListWorkflowTemplate.filter(itm => itm.subject === nameworkflow)
      //   this.props.listWorkFlowSub(listSub)
      // }

      toggle=()=> {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      handeleTemplateChange=(value)=>{
        this.setState({ selectedOption:value})
        // console.log(value)
        // const {ListWorkflowTemplate} = this.props.listWorkflow
        // const workflowTemplate = ListWorkflowTemplate.filter(itm => itm.template === value.label)
        // console.log(workflowTemplate.template)
        this.props.workflowTemplate(value.label)
    }

  render() {
      const {listofSubjectObj,ListWorkflowTemplate} = this.props.listWorkflow
      const { selectedOption } = this.state;
      const optionSubject = ListWorkflowTemplate.map((itm => ({ value: itm.template, label: itm.template})))
    // console.log(optionSubject[0])
 
    
      return (
 
        <Select
          className="basic-single"
          onChange={this.handeleTemplateChange}
          placeholder="Enter the Template"
          options={optionSubject}
          value={selectedOption}
        />

    )
  }
}

ListTemplate.propTypes={
    session: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
   
  }
  const mapStateToProps= state =>({
    session:state.session,
    listWorkflow:state.listWorkflow,
    
  })
export default connect(mapStateToProps,{workflowTemplate})(ListTemplate)