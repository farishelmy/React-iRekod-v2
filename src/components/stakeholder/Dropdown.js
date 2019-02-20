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
            optionStakeh:[
                { value: "All", label:"All Locations"},
                { value: "organization", label:"Organization"},
                { value: "Position", label:"Position"},
                { value: "Person", label:"Person"},
                { value: "Unknown", label:"Unknown"},                 
            ],             
        }
    }      

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderlistType.stakehType !== this.props.stakeholderlistType.stakehType){            
            const {stakehLabel,stakehNumb} = this.props.stakeholderlistType 
            const value = ({value:stakehNumb, label:stakehLabel})
            
            this.setState({
                selectedStakeh: value
            })
        }         
    }

    componentWillMount(){
        const {stakehLabel,stakehNumb} = this.props.stakeholderlistType 
        const value = ({value:stakehNumb, label:stakehLabel})

        this.setState({        
            selectedStakeh: value
        })   
    }

    handleChange = (value) => {
        // console.log(value.value)
        this.setState({ selectedStakeh: value.value})

        const {user:{_id:bId}} = this.props.session

        const stakehObj={
            _action:'LISTLOCATION',
            _id:bId,                        
            filterType: value.value,
        }
      
        this.props.setStakehType(stakehObj) 
        this.props.setStakehNumb(value.value)
        this.props.setStakehLabel(value.label)

        if (value.value === "All"){
            const stakehList={
                _action: "LISTLOCATION",
                _id: bId       
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
    breadcrumb: PropTypes.object.isRequired, 
    setStakehType: PropTypes.func.isRequired,   
    setStakehLabel: PropTypes.func.isRequired,
    setStakehNumb: PropTypes.func.isRequired,    
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    stakeholderlistType:state.stakeholderlistType,   
    breadcrumb: state.breadcrumb 
    
  })
export default connect(mapStateToProps,{
    setStakehType,
    setStakehNumb,
    setStakehLabel
})(Dropdown)