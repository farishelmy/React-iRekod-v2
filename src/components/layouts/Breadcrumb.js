import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage, setPageSubject} from '../../actions/layoutInitAction'

class Breadcrumb extends Component {

    setActivePage=(e)=>{
        e.preventDefault()       
  
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        this.props.setPageSubject('')
    } 

  render() {
    const {pageTitle, pageSubject}=this.props.layout
    // const {stakeholderDetail,breadCrumb_View} = this.props.stakeholderView

    return (
        <ul className="breadcrumb">
            <a className="breadcrumb-item" href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a>
                <a className="breadcrumb-item" href='/' data-pagename="listOfWorkflow" onClick={this.setActivePage}>{pageTitle}</a>
                <a className={pageSubject === "" ?"d-none":"breadcrumb-item active"} href='/'>{pageSubject === "" || pageSubject === undefined? "d-none" : pageSubject}</a>
        </ul>

 
 
    )
  }
}
Breadcrumb.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    setPageSubject:PropTypes.func.isRequired,
    
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    


  })
  export default connect(mapStateToProps,{setActivePage, setPageSubject})(Breadcrumb)
