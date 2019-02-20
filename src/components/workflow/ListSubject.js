import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {listWorkFlowSub} from '../../actions/workflowAction/authListWorkFlow'
import Select from 'react-select'

class ListSubject extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          selectedOption: []
        };
      }

      handleChange = (value) => {
        this.setState({ selectedOption: value });
        // console.log(`Option selected:`, selectedOption);
        console.log('yeayyy')
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      componentDidUpdate(prevProps){
        // console.log(prevProps.listWrkFlw.listWrkFlwObj!==this.props.listWrkFlw.listWrkFlwObj)
          if(prevProps.listWrkFlw.listWrkFlwObj!==this.props.listWrkFlw.listWrkFlwObj){
            const {listofSubjectObj,listWrkFlwObj} = this.props.listWrkFlw
            // console.log(listofSubjectObj[0].subject)
            const listSub = listWrkFlwObj.filter(itm => itm.subject === listofSubjectObj[0].subject)
            this.setState({
              selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
            })
            this.props.listWorkFlowSub(listSub)
          }
        
      }

      componentWillMount(){
        const {listofSubjectObj,listWrkFlwObj} = this.props.listWrkFlw
        
        const listSub = listWrkFlwObj.filter(itm => itm.subject === listofSubjectObj[0].subject)
        // console.log(listSub)
        {listSub===null || listSub==''?
        this.setState({
          selectedOption:[{label : '', value: ''}]
        }):

        this.setState({
          selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
        })
      }
        // this.setState({
        //   selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
        // })
        this.props.listWorkFlowSub(listSub)
      }

      getWorkFlow=(e)=>{
        console.log('111')
        const {listWrkFlwObj}=this.props.listWrkFlw
        const nameworkflow = e.target.getAttribute('data-name')        
        const listSub = listWrkFlwObj.filter(itm => itm.subject === nameworkflow)
        this.props.listWorkFlowSub(listSub)
      }

      handleSelectChangerecType=(value)=>{
        this.setState({ selectedOption:value})
        const {listWrkFlwObj} = this.props.listWrkFlw

        const listSub = listWrkFlwObj.filter(itm => itm.subject === value.value)
        this.props.listWorkFlowSub(listSub)
    }

  render() {
      const {listofSubjectObj} = this.props.listWrkFlw
      const { selectedOption } = this.state;
      const optionSubject = listofSubjectObj.map((itm => ({ value: itm.subject, label: itm.subject})))
    // console.log(optionSubject[0])
    
      return (
 
        <Select
          className="basic-single"
          onChange={this.handleSelectChangerecType}
          options={optionSubject}
          value={selectedOption}
        />

    )
  }
}

ListSubject.propTypes={
    session: PropTypes.object.isRequired,
    listWrkFlw: PropTypes.object.isRequired,
   
  }
  const mapStateToProps= state =>({
    session:state.session,
    listWrkFlw:state.listWrkFlw,
    
  })
export default connect(mapStateToProps,{listWorkFlowSub})(ListSubject)