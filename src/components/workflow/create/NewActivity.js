import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NewFolTabHead from './NewTabWorkflowHead'
import NewActivityWizard from './NewActivityWizard'
import NewEmailWizard from './NewEmailTemplate'
import NewAutoScript from './NewAutoScript'

import {setWizardPageNew} from '../../../actions/workflowAction/createNewActAction'
import {setActivePage, setPageSubject} from '../../../actions/layoutInitAction'


class NewActivity extends Component {

  handleWizard=(wizardName)=>{
      
    this.props.setWizardPageNew(wizardName)
    }

    nextPage=(param)=>{
      this.props.setWizardPageNew(param)
  }

  prevPage=(param)=>{
      this.props.setWizardPageNew(param)
  }

  setActivePage=(e)=>{
    e.preventDefault()       

    this.props.setActivePage(e.target.getAttribute('data-pagename'))
    this.props.setPageSubject('')
}

    
  render() {

    const {wizardPage, containerLine} = this.props.crtNewReducer
    const {pageTitle} = this.props.layout

    this.components={
      newActivityWizard:NewActivityWizard,
      newEmail:NewEmailWizard,        
      newAutoscript:NewAutoScript,
    }
    const NewDetailsWizard=this.components[wizardPage]
    return (
      <div>

        <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index">{pageTitle}</a></div>
                   
                </div>
            </div>
        </div> 

        <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display"></h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <NewFolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizardPage}
                                    isContainer={containerLine} 
                                    />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <NewDetailsWizard                                     
                                    // item={item}   
                                    nextPage={this.nextPage}  
                                    active={wizardPage} 
                                    prevPage={this.prevPage}
                                    />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
      </div>
    )
  }
}

NewActivity.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPageNew:PropTypes.func.isRequired,
  crtNewReducer:PropTypes.object.isRequired,
  setActivePage:PropTypes.func.isRequired,
  setPageSubject:PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      crtNewReducer:state.crtNewReducer
  
})
  
export default connect(mapStateToProps,{setWizardPageNew, setActivePage, setPageSubject})(NewActivity)
