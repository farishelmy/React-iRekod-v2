import React, { Component } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setStakehType,setStakehLabel,setStakehNumb} from '../../actions/stakeholderAction/stakehTypeAction'

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            selectedStakeh: [],
            optionStakeh : null
        }
    }      

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderlistType.stakehType !== this.props.stakeholderlistType.stakehType){
            const {stakehNumb} = this.props.stakeholderlistType
            const {optionStakeh} = this.state
            const listType = optionStakeh.filter(itm => itm.value === stakehNumb)          

            this.setState({
                selectedStakeh: listType
            })
        }
    }

    componentWillMount(){
        // const {stakehLabel,stakehNumb} = this.props.stakeholderlistType      

        this.setState({
            optionStakeh:[
                { value: "All", label:"All Locations"},
                { value: "0", label:"Group"},
                { value: "1", label:"Organization"},
                { value: "2", label:"Branch"},
                { value: "3", label:"Department"},
                { value: "4", label:"Designation"},
                { value: "5", label:"User"}
            ]
        })   
    }

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
        this.props.setStakehLabel(value.label)

        if (value.value === "All"){
            const stakehList={
                action: "ITEM_LIST",
                bio_access_id: idAccess       
            }
            this.props.setStakehType(stakehList)
        }
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
    setStakehLabel: PropTypes.func.isRequired,
    setStakehNumb: PropTypes.func.isRequired,    
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    stakeholderlistType:state.stakeholderlistType,    
    
  })
export default connect(mapStateToProps,{
    setStakehType,
    setStakehNumb,
    setStakehLabel
})(Dropdown)