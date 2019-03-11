import React, { Component,Fragment } from 'react'
import GeneralWizard from '../../activity/listActivity/GeneralWizard'
import recordWizard from '../../workflow/listWorkflow/RecordWizard'
import escalationWizard from '../../activity/listActivity/EscalationWizard'
import emailWizard from '../../activity/listActivity/EmailWizard'
import FolTabHead from '../../activity/listActivity/TabActivityDet'
import Breadcrumb from '../../layouts/Breadcrumb'

import {setWizardPage} from '../../../actions/activityAction/listActivity/listActivityAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'


class ActivityDetails extends Component {

    handleWizard=(wizardName)=>{
    
        const {user:{_id:bId}}=this.props.session
        

        this.props.setWizardPage(wizardName)
        
        
        // //Activity Detail
        // const workflowDet={
        //     _action:'SEARCHACTIVITY',         
        //     workflowUri:wrkflSel,
        //     _id:bId,               
        // } 
        // this.props.setListActivity(workflowDet)

    }    

     


render() {

    const {wizardPage, containerLine, activityDet} = this.props.listActivity
      

    
    this.components={
        general:GeneralWizard,
        record:recordWizard,
        escalation:escalationWizard,
        email:emailWizard        

    }
    const DetailsWizard=this.components[wizardPage]

  return (
    
  <Fragment>
      {/* <div className="breadcrumb-holder">
            <div className="container-fluid">
              <Breadcrumb/>
            </div>
        </div>    */}
 
        {activityDet.map((item,idx) =>   

       <section key={idx} className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">{item.activityName}</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizardPage}
                                    isContainer={containerLine} 
                                />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <DetailsWizard                                     
                                    item={item}                                      
                                    active={wizardPage} 
                                />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section> 
         ) } 
</Fragment>
  )
}
}

ActivityDetails.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPage: PropTypes.func.isRequired,
  listActivity: PropTypes.object.isRequired,
//   setListActivity: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,       
      listActivity:state.listActivity,
})
  
export default connect(mapStateToProps, { 
    setWizardPage,
    // setListActivity

})(ActivityDetails)