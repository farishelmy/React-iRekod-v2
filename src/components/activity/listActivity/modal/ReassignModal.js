import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { toggleErr, changeAssignee } from '../../../../actions/activityAction/listActivity/modal'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class ReassignModal extends Component {
  constructor() {
    super()
    this.state = {
      stakehList: [],
      assignee: [],
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.stakeholderlistType.stakehType !== this.props.stakeholderlistType.stakehType){
      const {stakehType}=this.props.stakeholderlistType   
      const stakehOptions = stakehType.map(itm=>({ value: itm.uri, label:itm.Name}))
      this.setState({
        stakehList:stakehOptions,
      })
    }
    
    if(prevProps.listActivity.activityDet !== this.props.listActivity.activityDet){
      const {activityDet} = this.props.listActivity
      const  assigned = activityDet.map(itm => ({label: itm.assignedTo, value: itm.assignedTo }))       
      this.setState({
        assignee: assigned
      })
    }

  }
  
  toggle = () => {
    const { showErr } = this.props.modal
    this.props.toggleErr(!showErr)
  }

  handleAssignee=(param)=>{     
     
    this.setState({assignee:param})
    // console.log(param)
  }

  formSubmit = (e) => {
    e.preventDefault()
    const { assignee } = this.state
    const { activityUri } = this.props.listActivity     
    const { user: { _id: bId } } = this.props.session
 
      const param = {
        _action: "SAVEASSIGNEE",
        _activityUri: activityUri,
        assignee: assignee.label,
        _id: bId,
      }
      console.log(param)
      // this.props.changeAssignee(param)
      this.props.toggleErr(false)
  

  }

  render() {
    const { showErr } = this.props.modal
    const { stakehList, assignee } = this.state
    // console.log(assignee)


    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Location</ModalHeader>
            <ModalBody> 

              <FormGroup>
                <label>Reassign Location</label>
                <Select 
                  name="assignee"
                  options={stakehList}
                  onChange={this.handleAssignee}
                  value={assignee===""?null:assignee} 
                  placeholder="Location"
                  isClearable
                /> 
              </FormGroup>
                  
            </ModalBody>

            <ModalFooter>
              <Button type="submit" color="primary">Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>

          </Form>
        </Modal>
      </div>

    )
  }
}
ReassignModal.propTypes = {
  modal: PropTypes.object.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  listActivity: PropTypes.object.isRequired,
  toggleErr: PropTypes.func.isRequired,
  changeAssignee: PropTypes.func.isRequired,
   

}
const mapStateToProps = (state) => ({
  modal: state.modal,
  listActivity: state.listActivity,
  stakeholderlistType: state.stakeholderlistType,
  session: state.session,

})
export default connect(mapStateToProps,
  {
    toggleErr,
    changeAssignee
  
  })
  (ReassignModal)


