import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage,setPageTitle} from '../../../actions/layoutInitAction' 
import {setStakehType} from '../../../actions/stakeholderAction/stakehTypeAction' 
import {bcUpd} from '../../../actions/stakeholderAction/stakehBreadCrumbAction'


class AddCloseBtn extends Component {

    ActivePage=(e)=>{
        e.preventDefault()   
        
        this.props.bcUpd(false) //Breadcrumb Condition
        
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehSel:stakeholder_id,stakehNumb} = this.props.stakeholderlistType
        const {pageTitle} = this.props.layout
        // console.log(pageTitle)   
       
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
        }
        this.props.setStakehType(stakehObj) 
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        this.props.setPageTitle(pageTitle)      

    }

  render() {

    
    
    return (

        <button type="button" className="btn btn-secondary" onClick={this.ActivePage} data-pagename="index">Close</button>


 
 
    )
  }
}
AddCloseBtn.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderBreadCrumb: PropTypes.object.isRequired,   
    setStakehType: PropTypes.func.isRequired,   
    bcUpd: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    stakeholderBreadCrumb: state.stakeholderBreadCrumb,
    stakeholderlistType: state.stakeholderlistType
    


  })
  export default connect(mapStateToProps,{
      setActivePage,
      setStakehType, 
      bcUpd,
      setPageTitle,
      
      

    })(AddCloseBtn)
