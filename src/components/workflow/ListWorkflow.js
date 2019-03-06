import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ListTemplate from './ListTemplate'


import Breadcrumb from '../layouts/Breadcrumb'
import {setActivePage,setPageTitle, setPageSubject} from '../../actions/layoutInitAction'
import {setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName} from '../../actions/workflowAction/authListWorkFlow'
import {setItemListSubject, setRecordStore, setListActivity,setDelBtn, setTaskResult} from '../../actions/workflowAction/workflowDetailAction'
import {setEmailStoreNew} from '../../actions/workflowAction/createNewActAction'
import {setActivityDetailsUpdate} from '../../actions/workflowAction/updateActAction'
import {setNewBread} from '../../actions/breadcrumbAction'
import Tooltip from 'rc-tooltip'
import update from 'immutability-helper' 

import Search from '../workflow/searchWorkflow/modal/ModalWorkflow'
import CardView from './CardView'
import ListView from './ListView'
import Fab from '../../components/fab/FabWorkflow'
import 'rc-tooltip/assets/bootstrap.css'


class ListWorkflow extends Component {

    constructor(){
        super()
        this.state={
            workList:[],
        }
    
    }


    componentDidUpdate(prevProps){
        if(prevProps.listWorkflow.listWorkflow!==this.props.listWorkflow.listWorkflow){
            const {listWorkflow}=this.props.listWorkflow  
            // console.log(listWorkflow)
            const listWkflw = listWorkflow.map(res=>({...res,isSel:false}))
            //  console.log(listWkflw)
            this.setState({
                workList:listWkflw
            })
        }          
    }

    //Direct Page To WorkFlow Detail
    setActivePage=(FabRec)=>{
         
        const {user:{_id:bId}}=this.props.session
        const {wrkflSel, workflowTemplate, workflowName}=this.props.listWorkflow          

        // this.props.setPageSubject(workflowTemplate)
        this.props.setActivePage(FabRec)
        
        //Activity Wizard
        const workflowDet={
            _action:'SEARCHACTIVITY',         
            workflowUri:wrkflSel,
            _id:bId,               
        } 

        this.props.setListActivity(workflowDet)

        //Record Wizard    
        const recordDet = {
            _id: bId,
            _action: "SEARCHRECORD",
            jsonQuery: JSON.stringify([{"op":"EQUALS","field":"%26%26Related+Records+of+Workflow","value1":workflowName}]),
            searchOrder: "0"
        }
        // console.log(recordDet)
        this.props.setRecordStore(recordDet)        
      
        // this.props.setActivityDetailsUpdate(workflowDet)  
        // this.props.setTaskResult(taskResulStatusObj)   

        //Breadcrumb
        this.props.setNewBread(false,{
            id: 'viewDetails', 
            label: workflowName, 
            activePage: 'viewDetails', 
            isActive: true,
        })  
         

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
    markOnSel=(workflowName, markOnSel,workflowUri, isSel,supervisor,icon,dateStart,dateDue,jobNo,priority)=>{
        
        const {user:{_id:bId}}=this.props.session
        const val = [{workflowName, markOnSel,workflowUri, isSel,supervisor,icon,dateStart,dateDue,jobNo,priority}]

        this.props.getDetails(val) //Set Workflow Details
        this.props.setSelWorkFlow(workflowUri)  //Set Workflow Uri
        this.props.setWorkflowName(workflowName)  //Set Workflow Name
    
        // const stakehList={
        //     action: "ITEM_LIST",
        //     bio_access_id: bId       
        // }
        // this.props.setStakehList(stakehList)

        // const itemListSubject={
        //     action: "ITEM_LIST_BY_SUBJECT",
        //     bio_access_id: bId,
        //     subject: subject     
        // }
        // console.log(subject)
        // this.props.setItemListSubject(itemListSubject)

        const {workList} = this.state
        // console.log({workList} )
        const itmIdx = workList.findIndex(itm=>itm.workflowUri === workflowUri)
        const desIdx = workList.findIndex(itm=>itm.isSel===true)

        const newWrkfwList = desIdx === -1?
        update(workList,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(workList,{
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
            workList: newWrkfwList 
            
        })
      }


      
      //Delete Btn
      delBtn=()=>{
        // const {wrkflowSelect} = this.state
        const {user:{_id:bId}} = this.props.session  
        const {wrkflSel, listWorkflow}=this.props.listWorkflow 
          
        //  console.log(wrkflSel)       

        const wrkflowObj={
            bio_access_id:bId,
            task_ids:[wrkflSel]
        
        }
        this.props.setDelBtn(wrkflowObj)

        const itemDeleted = listWorkflow.filter(itm => itm.task_id !== wrkflSel)
        // console.log(vv)
        // this.props.listWorkFlowSub(itemDeleted)

        alert("Successful Deleted")
  
    } 

    //Change view Card and List
    changeToViewCard=(e)=>{
        const{cardView}=this.props.listWorkflow
        this.props.setCardView(!cardView)
    }



  render() {

    const{cardView, showFab}=this.props.listWorkflow
    const{activePage}=this.props.layout
    
    const{workList}=this.state
    // console.log(workList)
    
    const rec = workList.map(itm=>cardView?
        <CardView
            key={itm.workflowUri}
            workflowName={itm.workflowName}
            workflowUri={itm.workflowUri}
            icon={itm.iconCls}
            markOnSel={this.markOnSel}            
            isSel={itm.isSel}
            supervisor={itm.supervisor}
            dateStart={itm.dateStarted}
            dateDue={itm.dateDue}
            jobNo={itm.jobNumber}
            priority={itm.priority}
        /> :
        <ListView
            key={itm.workflowUri}
            workflowName={itm.workflowName}
            workflowUri={itm.workflowUri}
            markOnSel={this.markOnSel}             
            isSel={itm.isSel}
            dateStart={itm.dateStarted}
            dateDue={itm.dateDue}
            jobNo={itm.jobNumber}
            priority={itm.priority}
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
                        <h1 className="h3 display"><strong>Workflow Template</strong></h1>  
                       
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

                    {
                        activePage==="listOfWorkflow"?<ListTemplate/>:activePage==="SearchWorkflow"?<Search/>:""
                
                }

                  
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
                        <p className="card-title mb-1 font-weight-bold text-muted">Date Start</p>
                    </div>
                    <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">Date Due</p>
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

ListWorkflow.propTypes={
    layout: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    listWorkflow: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setCardView:PropTypes.func.isRequired,
    setSelWorkFlow:PropTypes.func.isRequired,
    setShowFab:PropTypes.func.isRequired,
    setListActivity:PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    // setStakehList:PropTypes.func.isRequired,
    setItemListSubject:PropTypes.func.isRequired,
    setRecordStore:PropTypes.func.isRequired,
    setEmailStoreNew:PropTypes.func.isRequired,
    setDelBtn:PropTypes.func.isRequired,
    setTaskResult: PropTypes.func.isRequired,
    setPageTitle:PropTypes.func.isRequired,
    setActivityDetailsUpdate: PropTypes.func.isRequired,
    setPageSubject:PropTypes.func.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    setNewBread: PropTypes.func.isRequired,
    
}
const mapStateToProps= state =>({
    session: state.session,
    listWorkflow: state.listWorkflow, 
    layout: state.layout,   
    
})
export default connect(mapStateToProps,
{
    setActivePage,
    setCardView, 
    setSelWorkFlow, 
    setShowFab, 
    setListActivity, 
    getDetails, 
    setNewBread,
    setItemListSubject,
    setRecordStore,
    setEmailStoreNew,
    setDelBtn, 
    setTaskResult,
    setPageTitle,
    setActivityDetailsUpdate,
    setPageSubject,
    setWorkflowName

})(ListWorkflow)

