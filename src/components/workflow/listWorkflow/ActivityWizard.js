import React, { Component, Fragment } from 'react'
import ListActivity from './ListActivity'
import {setSelWorkFlow, setShowFab} from '../../../actions/workflowAction/authListWorkFlow'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import update from 'immutability-helper' 

 
class ActivityWizard extends Component {
    constructor(){
      super()    
      this.state={
        listActivity:[]      
      }       
    }  
    
  componentWillMount(){
    const {listActivity}=this.props.listWorkflow  
    // console.log(listActivity)
    const listAct = listActivity.map(res=>({...res,isSel:false}))
    //  console.log(listAct)
    this.setState({
      listActivity:listAct
    })
  }
 


  markOnSel=(activityUri,activityName,workflowName,assignedTo,activityDateDue,iconCls,supervisor,priority)=>{
        
    const {user:{_id:bId}}=this.props.session   
    
    const {listActivity} = this.state
    // console.log({workList} )
    const itmIdx = listActivity.findIndex(itm=>itm.activityUri === activityUri)
    const desIdx = listActivity.findIndex(itm=>itm.isSel===true)

    const newListAct = desIdx === -1?
    update(listActivity,{
      [itmIdx]:{isSel:{$set:true}}
    })
    :update(listActivity,{
      [itmIdx]:{isSel:{$set:true}},
      [desIdx]:{isSel:{$set:false}}
    })  
    // // select
    if (itmIdx===desIdx){
        this.props.setShowFab(false)
        this.props.setSelWorkFlow(null) 
                  
     
    }
    else{
        this.props.setShowFab(true)
    }

    this.setState({
      listActivity: newListAct 
        
    })
  }



  render() {
    // const {workflowName,isSel,workflowUri,supervisor,icon,dateStart,dateDue,jobNo,priority} = this.props.item
    const {listActivity} = this.state
    // console.log(listActivity)
    
 

    

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Activity List</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
        <div className="row justify-content-center mb-5">
          {/* <div className="col-xl-3 col-lg-4 col-md-4">
              <div className="text-center">
                  <img src={require('../../../img/email.svg')} className=" img-dash" alt="emailImage" />
              </div>
          </div> */}

          <div className="row">
            <div className="col-12">                
              <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 img-fluid img-scale"/>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Activity Name</p>
                  </div>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Workflow Name</p>
                  </div>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Assigned To</p>
                  </div>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Date Due</p>
                  </div>
              </div>               
            </div>  
            
            { listActivity.map(item=>
              <ListActivity
                key={item.activityUri}
                activityUri={item.activityUri}
                activityName={item.activityName}
                workflowName={item.workflowName}
                assignedTo={item.assignedTo}
                activityDateDue={item.activityDateDue}
                iconCls={item.iconCls}
                supervisor={item.supervisor}
                priority={item.priority}  
                isSel={item.isSel}
                markOnSel={this.markOnSel}              
              />
            )}

            
  
          </div>
        </div>   
     </form>
      </Fragment>
    )
  }
}

ActivityWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,      
  listWorkflow: PropTypes.object.isRequired, 
  setSelWorkFlow: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
   
  
   
    
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,      
      listWorkflow:state.listWorkflow,
       
})
  
export default connect(mapStateToProps, {
  setSelWorkFlow, 
  setShowFab
   
})(ActivityWizard)
