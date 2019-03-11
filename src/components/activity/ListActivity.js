import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layouts/Breadcrumb'
import {setActivePage,setPageTitle, setPageSubject} from '../../actions/layoutInitAction'
// import { setSelWorkFlow, getDetails} from '../../actions/workflowAction/authListWorkFlow'
// import {setItemListSubject, setRecordStore, setDelBtn} from '../../actions/workflowAction/workflowDetailAction'
import {getDetails, activityUri, activityName, setCardView, setShowFab, setWizardPage} from '../../actions/activityAction/listActivity/listActivityAction'
// import {setEmailStoreNew} from '../../actions/workflowAction/createNewActAction'
// import {setActivityDetailsUpdate} from '../../actions/workflowAction/updateActAction'
import {setNewBread} from '../../actions/breadcrumbAction'
import Tooltip from 'rc-tooltip'
import update from 'immutability-helper' 

import CardView from './CardView'
import ListView from './ListView'
import Fab from '../../components/fab/FabActivity'
import 'rc-tooltip/assets/bootstrap.css'


class ListActivity extends Component {

    constructor(){
        super()
        this.state={
            listAct:[],
        }
    
    }


    componentDidUpdate(prevProps){
        if(prevProps.listActivity.listActivityDue!==this.props.listActivity.listActivityDue){
            const {listActivityDue}=this.props.listActivity  
            // console.log(listActivityDue)
            const act= listActivityDue.map(res=>({...res,isSel:false}))
            //  console.log(listWkflw)
            this.setState({
                listAct:act
            })
        }          
    }

    //Direct Page To WorkFlow Detail
    setActivePage=(FabRec)=>{

        // console.log(FabRec)
         
        const {user:{_id:bId}}=this.props.session
        const {activitySel, listActivityDue}=this.props.listActivity          

        // this.props.setPageSubject(workflowTemplate)
        this.props.setActivePage(FabRec)
        this.props.setWizardPage("general")
        
        // //Activity Wizard
        // const workflowDet={
        //     _action:'SEARCHACTIVITY',         
        //     workflowUri:wrkflSel,
        //     _id:bId,               
        // } 

        // this.props.setListActivity(workflowDet)

        // //Record Wizard    
        // const recordDet = {
        //     _id: bId,
        //     _action: "SEARCHRECORD",
        //     jsonQuery: JSON.stringify([{"op":"EQUALS","field":"%26%26Related+Records+of+Workflow","value1":workflowName}]),
        //     searchOrder: "0"
        // }
        // // console.log(recordDet)
        // this.props.setRecordStore(recordDet)        
      
         

        // //Breadcrumb
        // this.props.setNewBread(false,{
        //     id: 'viewDetails', 
        //     label: workflowName, 
        //     activePage: 'viewDetails', 
        //     isActive: true,
        // })  
         

    }

    //Create new Workflow
    // createNewActivity=(e)=>{
    //     const page = e.target.getAttribute('data-pagename')
    //     const pageTitle = e.target.getAttribute('data-name')
    //     const {user:{bio_access_id:bId}}=this.props.session

    //     this.props.setActivePage(page)

    //     const emailObj={
    //     action: "ITEM_LIST",
    //     bio_access_id: bId      
    //         }
    //     this.props.setEmailStoreNew(emailObj)
    //     this.props.setPageTitle(pageTitle)
    // }

   

    //Selection
    markOnSel=(activityName,activityUri,markOnSel,workflowName,assignedTo,activityDateDue,icon,isSel,supervisor,priority,estDuration)=>{        
         
        const val = [{activityName,activityUri,markOnSel,workflowName,assignedTo,activityDateDue,icon,isSel,supervisor,priority,estDuration}]

        this.props.getDetails(val) //Set Workflow Details
        this.props.activityUri(activityUri)  //Set Workflow Uri
        this.props.activityName(workflowName)  //Set Workflow Name
    

        const {listAct} = this.state
        // console.log(listAct)
        const itmIdx = listAct.findIndex(itm=>itm.activityUri === activityUri)
        const desIdx = listAct.findIndex(itm=>itm.isSel===true)

        const newWrkfwList = desIdx === -1?
        update(listAct,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(listAct,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })  
        // // select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
            this.props.activityUri(null) 
                      
         
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            listAct: newWrkfwList 
            
        })
    }


      
    //Delete Btn
    // delBtn=()=>{
    //     // const {wrkflowSelect} = this.state
    //     const {user:{_id:bId}} = this.props.session  
    //     const {wrkflSel, listActivityDue}=this.props.listActivity 
            
    //     //  console.log(wrkflSel)       

    //     const wrkflowObj={
    //         bio_access_id:bId,
    //         task_ids:[wrkflSel]

    //     }
    //     this.props.setDelBtn(wrkflowObj)

    //     const itemDeleted = listActivity.filter(itm => itm.task_id !== wrkflSel)
    //     // console.log(vv)
    //     // this.props.listWorkFlowSub(itemDeleted)

    //     alert("Successful Deleted")

    // } 

    //Change view Card and List
    changeToViewCard=(e)=>{
        const{cardView}=this.props.listActivity
        this.props.setCardView(!cardView)
    }



  render() {

    const{cardView, showFab}=this.props.listActivity
    
    const{listAct}=this.state
    // console.log(listAct)
    
    const rec = listAct.map(itm=>cardView?
        <CardView
            key={itm.activityUri}
            activityName={itm.activityName}
            activityUri={itm.activityUri}
            workflowName={itm.workflowName}
            assignedTo={itm.assignedTo}
            activityDateDue={itm.activityDateDue}           
            icon={itm.iconCls}
            markOnSel={this.markOnSel}  
            isSel={itm.isSel}
            supervisor={itm.supervisor}             
            priority={itm.priority}
            estDuration={itm.estDuration}
        /> :
        <ListView
            key={itm.activityUri}
            activityName={itm.activityName}
            activityUri={itm.activityUri}
            workflowName={itm.workflowName}
            assignedTo={itm.assignedTo}
            activityDateDue={itm.activityDateDue}           
            icon={itm.iconCls}
            markOnSel={this.markOnSel}  
            isSel={itm.isSel}
            supervisor={itm.supervisor}             
            priority={itm.priority}
            estDuration={itm.estDuration}
        />
        )
       
    return (
      <Fragment>  

        <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div>
    
      <section className="forms">
          <div className="container-fluid">
          <header>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 display"><strong>List of Activity</strong></h1>  
                       
                            <div className="d-flex align-items-center">                          

                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Create new activity</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                            <button className="btn btn-sm btn-primary" onClick={this.createNewActivity} name="createNewAct" data-name="Create New" data-pagename="createNewAct">
                            <i className="fa fa-tasks" name="createNewAct" data-name="Create New" data-pagename="createNewAct"></i>
                            </button>
                            </Tooltip>

                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Change to Card</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                            <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                <i className="fa fa-th" aria-hidden="true"></i>
                            </button>
                            </Tooltip>


                            <Tooltip
                                placement="top"
                                overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                                <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>

                            </button>

                            </Tooltip>
                        </div>

                    </div>

                    

        </header>
        
        <div className="row">
           {cardView===false?<div className="row">
            <div className="col-12">                
                <div className="d-flex justify-content-between align-items-center">
                <div className="p-2 img-fluid img-scale"/>
                    <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">Title</p>
                    </div>
                    <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">Workflow</p>
                    </div>
                    <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">Assigned To</p>
                    </div>
                    <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">Due Date</p>
                    </div>
                </div>               
            </div>
                {rec} 
            </div>:rec}
        </div> 

        {showFab?<Fab 
        FabRec={this.setActivePage}
        delBtn={this.delBtn}
        />:''}
</div>
</section>
</Fragment>  
    )
  }
}

ListActivity.propTypes={
    session: PropTypes.object.isRequired,
    listActivity: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setCardView:PropTypes.func.isRequired,
    // setSelWorkFlow:PropTypes.func.isRequired,
    setShowFab:PropTypes.func.isRequired,
    // setListActivity:PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    // setStakehList:PropTypes.func.isRequired,
    // setItemListSubject:PropTypes.func.isRequired,
    // setRecordStore:PropTypes.func.isRequired,
    // setEmailStoreNew:PropTypes.func.isRequired,
    // setDelBtn:PropTypes.func.isRequired,
    setPageTitle:PropTypes.func.isRequired,
    // setActivityDetailsUpdate: PropTypes.func.isRequired,
    // setPageSubject:PropTypes.func.isRequired,
    setNewBread: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired,
    activityName: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
    
}
const mapStateToProps= state =>({
    session: state.session,
    listActivity: state.listActivity,    
    
})
export default connect(mapStateToProps,
{
    setActivePage,
    setCardView, 
    // setSelWorkFlow, 
    setShowFab, 
    // setListActivity, 
    getDetails, 
    setNewBread,
    // setItemListSubject,
    // setRecordStore,
    // setEmailStoreNew,
    // setDelBtn, 
    setPageTitle,
    // setActivityDetailsUpdate,
    // setPageSubject,
    activityUri,
    activityName,
    setWizardPage

})(ListActivity)

