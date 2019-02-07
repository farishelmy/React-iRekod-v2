import React, { Component } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setStakehType,setStakehNumb} from '../../actions/stakeholderAction/stakehTypeAction'

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            selectedStakeh: [],
            optionStakeh :[
                { value: "0", label:"Group"},
                { value: "1", label:"Organization"},
                { value: "2", label:"Branch"},
                { value: "3", label:"Department"},
                { value: "4", label:"Designation"},
                { value: "5", label:"User"}
            ]
        }
    }      

    componentDidUpdate(prevProps){
        // console.log(prevProps.listWrkFlw.listWrkFlwObj!==this.props.listWrkFlw.listWrkFlwObj)
        if(prevProps.stakeholderlistType.stakehType !== this.props.stakeholderlistType.stakehType){

            const {stakehNumb} = this.props.stakeholderlistType
            const listType = this.state.optionStakeh.filter(itm => itm.value === stakehNumb)          
    
            this.setState({
                selectedStakeh: listType
            })
        }
    }

    // componentWillMount(){
    //     const {listofSubjectObj,listWrkFlwObj} = this.props.listWrkFlw
        
    //     const listSub = listWrkFlwObj.filter(itm => itm.subject === listofSubjectObj[0].subject)
    //     // console.log(listSub)
    //     {listSub===null || listSub==''?
    //     this.setState({
    //       selectedOption:[{label : '', value: ''}]
    //     }):

    //     this.setState({
    //       selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
    //     })
    //   }
    //     // this.setState({
    //     //   selectedOption:[{label : listofSubjectObj[0].subject, value: listofSubjectObj[0].subject}]
    //     // })
    //     // this.props.stakeholderList(listSub)
    // }

    // getWorkFlow=(e)=>{
    //     console.log('111')
    //     const {listWrkFlwObj}=this.props.listWrkFlw
    //     const nameworkflow = e.target.getAttribute('data-name')        
    //     const listSub = listWrkFlwObj.filter(itm => itm.subject === nameworkflow)
    //     // this.props.stakeholderList(listSub)
    // }

    handleChange = (value) => {
        // console.log(value.value)
        this.setState({ selectedStakeh: value.value})

        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session

        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(value.value),
        }
      
        this.props.setStakehType(stakehObj) 
        this.props.setStakehNumb(value.value)
    }
    
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

  render() {
    
    
    return (
 
        <Select
            className="basic-single"
            onChange={this.handleChange}
            options={this.state.optionStakeh}
            placeholder="Type"
            value={this.state.selectedStakeh}
        />

    )
  }
}

Dropdown.propTypes={
    session: PropTypes.object.isRequired, 
    stakeholderlistType: PropTypes.object.isRequired, 
    setStakehType: PropTypes.func.isRequired,   
    setStakehNumb: PropTypes.func.isRequired,    
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    stakeholderlistType:state.stakeholderlistType,    
    
  })
export default connect(mapStateToProps,{
    setStakehType,
    setStakehNumb
})(Dropdown)