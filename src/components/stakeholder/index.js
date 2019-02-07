import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,setStakehViewTrue,setStakehViewFalse,setShowFab} from '../../actions/stakeholderAction/stakehTypeAction' 
import {setActivePage} from '../../actions/layoutInitAction'  
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess,setDelBtn} from '../../actions/stakeholderAction/stakehViewDetail'
import {bcDet,bcIndex} from '../../actions/stakeholderAction/stakehBreadCrumbAction'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel,setWizardPage} from '../../actions/stakeholderAction/stakehUpdateAction'
import {showMultiFab} from '../../actions/fabAction'
 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import BreadCrumb from '../layouts/BreadcrumbStakeh'
import CardRow from '../stakeholder/CardRow'  
import DetailCard from '../stakeholder/DetailCard'
import Fab from '../fab/FabStakeholder'
import MultiFab from '../fab/MultiFab'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import 'rc-pagination/assets/index.css' 
 
 

class index extends Component {
    constructor() {
        super();     
        this.state = {
            stakeholderlistType:[],
            stakehSelect:null,    
            fabMenu:null,        
        };
    }   

    componentWillMount(){
        const {stakehType} = this.props.stakeholderlistType
        this.setState({stakeholderlistType:stakehType})
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.stakeholderlistType.stakehType!==this.props.stakeholderlistType.stakehType){                   
            const {stakehType}=this.props.stakeholderlistType 
            // console.log(stakehType)   
            const liststakeh = stakehType.map(res=>({...res,isSel:false}))
            // console.log(liststakeh)
            
            this.setState({
                stakeholderlistType:liststakeh
            })
        }
        
        else if(prevProps.fab.isSelAll===!this.props.fab.isSelAll){
            const{isSelAll}=this.props.fab
            if(isSelAll){
                const{stakeholderlistType}=this.state
                const stakeh = stakeholderlistType.map(itm => ({ ...itm, isSel:true}))
                this.setState({stakeholderlistType: stakeh})
            }
        }   

        else if(prevState.stakeholderlistType !== this.state.stakeholderlistType){
            const{isMultiSel}=this.props.fab
            const{stakeholderlistType}=this.state
            // console.log(stakeholderlistType)
            if(isMultiSel){
                const listSelStakeh=stakeholderlistType.filter(itm => itm.isSel === true).map(itm=>({stakeholder_id:itm.stakeholder_id,full_name:itm.full_name}))
                this.props.setStakehSel(listSelStakeh)
            }
            else
            {
                const selStakeh=stakeholderlistType.find(itm => itm.isSel === true)
                // console.log(selStakeh)
                if(selStakeh!==undefined){
                    const {stakeholder_id:stakeholder_id} = selStakeh
                    this.props.setStakehSel({
                        stakeholder_id:stakeholder_id                       
                    })                   
                }
            }
        }

        else if(prevProps.stakeholderlistType.stakehSel!==this.props.stakeholderlistType.stakehSel){
            const {stakehSel}=this.props.stakeholderlistType
            // console.log(stakehSel)
            this.setState({stakehSelect:stakehSel})
        }   
             
    }

    //Selection 
    markOnSel=(sId)=>{
        
        this.props.setStakehSel(sId)     
        // console.log(sId)
        
        const{isMultiSel}=this.props.fab
        const {stakeholderlistType} = this.state
        // console.log(stakeholderlistType)
        const itmIdx = stakeholderlistType.findIndex(itm=>itm.stakeholder_id === sId),
            desIdx = stakeholderlistType.findIndex(itm=>itm.isSel===true),
            {isSel:selStakehIsSel}=stakeholderlistType.find(itm=>itm.stakeholder_id===sId)
      
        // console.log(itmIdx)
        // console.log(desIdx)

        const newStakeholderList = selStakehIsSel 
        ? update(stakeholderlistType,{[itmIdx]: {isSel:{$set:false}}})
        :isMultiSel
        ?update(stakeholderlistType,{[itmIdx]: {isSel:{$set:true}}})
        :desIdx === -1
        ?update(stakeholderlistType,{[itmIdx]:{isSel:{$set:true}}})
        :update(stakeholderlistType,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })       
         
        // console.log(newStakeholderList)

        //select
        if(!isMultiSel){
            if (itmIdx===desIdx){
                this.props.setShowFab(false)
                this.props.setStakehSel(null)   
                this.props.showMultiFab(true)//new         
            }
            else{
                this.props.setShowFab(true)
                this.props.showMultiFab(false)//new
            }
        }

        this.setState({
            stakeholderlistType: newStakeholderList             
        })
    }

    //BreadCrumb
    pageBreadCrumb=(e)=>{
        e.preventDefault()
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        
    }

    //Fab View Detail
    setActivePage=(param)=>{    
            
        const {stakehSel:{stakeholder_id}} = this.props.stakeholderlistType
        const {user:{bio_access_id:idAccess}} = this.props.session
        // console.log(stakeholder_id)

        this.props.bcIndex(false) //breadcrumb Index page 
        this.props.bcDet(true) //breadcrumb Detail page 
       
        this.props.setActivePage(param)  //direct page to viewDetail
        // console.log(param)

        //stkh Detail
        const stakehDet={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStakeholderItemDetail(stakehDet)    
        
        //Member
       const stakehMember={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
       }
       this.props.viewStakehMember(stakehMember)

       //Group
       const stakehGroup={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
       }
       this.props.viewStakehGroup(stakehGroup)

    //    //Access Control
    //    const stakehAcc={
    //         stakeholder_id:bId,
    //         bio_access_id:idAccess,
    //         action:'ITEM_ACCESS',             
    //     }
    //     this.props.viewStakehAccess(stakehAcc)   
      
    } 

    deleteMulti=(param)=>{
        this.props.setActivePage(param)
        this.props.setWizardPage(param)       

    }      

    //Add Stakeholder Child
    child=(page)=>{
     
        this.props.setActivePage(page)   
        // console.log(page)
    }
    
    // //LayoutView
    // stakehViewList=()=>{        
    //     this.props.setStakehViewTrue(true)        
    // }
    // stakehViewCard=()=>{       
    //     this.props.setStakehViewFalse(false)
    // }  
    
    stakehView=()=>{       
        const { stakehView } = this.props.stakeholderlistType
        this.props.setStakehViewFalse(!stakehView)
    }



    //change page to New Stakeholder
    addStakeh=(e)=>{
        e.preventDefault()
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        // console.log(e.target.getAttribute('data-pagename'))
    }

    
    //Change page to 'Update'
    activePage=(param)=>{         

        // console.log(param)
        // this.props.setActivePage(param==="deleteMulti"?"deleteMulti":"edit")
        this.props.setActivePage("edit")
        // this.props.setActivePage(param==="basic"?"edit":param==="security"?"edit":param==="access"?"edit":param==="group"?"edit":"multi")
        this.props.setWizardPage(param)
        // console.log(param)

        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel:{stakeholder_id},stakehNumb} = this.props.stakeholderlistType  
        // console.log(stakeholder_id)      
       
        //Role List
        const RoleObj={
            action: "ITEM_LIST",
            bio_access_id: idAccess      
        }
        this.props.setRoleStore(RoleObj)
        
          //Stakeholder List
        const stakehList={
            action:"ITEM_LIST",
            bio_access_id:idAccess
        }
        this.props.setStakehList(stakehList)

          //stkh Detail
        const stakehDet={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStkhAccDetail(stakehDet)   

        //Ancestor Group
        const listAncestor={
            bio_access_id: idAccess,
            stakeholder_id: stakeholder_id,
            action: "ITEM_LIST_ANCESTOR",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setAncestor(listAncestor)

        //Descendant Member
        const listDescendant={
            bio_access_id: idAccess,
            stakeholder_id: stakeholder_id,
            action: "ITEM_LIST_DESCENDANT",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setDescendant(listDescendant)

        //Security Level
         const SecurityObj={
            action: "ITEM_LIST",
            bio_access_id: idAccess      
        }
        this.props.setSecLevel(SecurityObj)

        //List Group
        const stakehGroup={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
        }
        this.props.viewStakehGroup(stakehGroup)

         //Member
        const stakehMember={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
        }
        this.props.viewStakehMember(stakehMember)         
    }    

     

    
    render() {
        
        const {stakehView,showFab,stakehNumb}=this.props.stakeholderlistType
        const {pageTitle}=this.props.layout
        const {stakeholderlistType}=this.state  
        // const {stakeholder_Detail}=this.props.stakeholderView 
        // console.log(fabMenu)
        
        return (
            <Fragment>  
                {/* <BreadCrumb/> */}
                
                 <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <div className="breadcrumb">
                            <div className="breadcrumb-item"><a href='/' onClick={this.pageBreadCrumb} data-pagename="dashboard">Home</a></div>
                            <div className="breadcrumb-item">{pageTitle}</div>
                            
                        </div>
                    </div>
                </div>             

                <section>
                    <div className="container-fluid">
                        <header>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h1 className="h3 display"><strong>{pageTitle}</strong></h1>  
                       
                                <div className="d-flex align-items-center">                          

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Create New Stakeholder</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary" data-pagename="addStakeholder" onClick={this.addStakeh}>
                                            <i className="fa fa-user-plus" data-pagename="addStakeholder"></i>
                                        </button>                            
                                    </Tooltip>

                                    <Tooltip
                                        placement='top'
                                        overlay={<div style={{ height: 20, width: "100%" }}>Toggle View</div>}
                                        arrowContent={<div className='rc-tooltip-arrow-inner' />}
                                    >
                                        <button className='btn btn-sm btn-primary ml-2' onClick={this.stakehView}>
                                        <i className={stakehView ? "fa fa-th-list" : "fa fa-th"} aria-hidden='true' />
                                        </button>
                                    </Tooltip>

                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>List View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.stakehViewList}>
                                            <i className="fa fa-tasks"></i>
                                        </button>                            
                                    </Tooltip>

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Card View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.stakehViewCard}>
                                            <i className="fa fa-th" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip> */}

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip>
 
                                </div>
                        </div>
                        </header>               
                            <div className="row">    
                            
                                {stakeholderlistType.map(item=>stakehView?
                                 
                                    <DetailCard                                         
                                        key={item.stakeholder_id} 
                                        stakehId={item.stakeholder_id}
                                        name={item.first_name}
                                        typeName={item.stakeh_type_name}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />:

                                    <CardRow                                         
                                        key={item.stakeholder_id} 
                                        stakehId={item.stakeholder_id}
                                        name={item.first_name}
                                        typeName={item.stakeh_type_name}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />                             
                                )}     

                                {showFab?
                                    
                                    <Fab
                                        FabRec={this.setActivePage}                                 
                                        stakehNumb={stakehNumb} 
                                        addChild={this.child}
                                        pageWizard={this.activePage} />: 

                                    <MultiFab
                                        stakehAction={this.deleteMulti}/>
                                }                                            
                                

                                
                            </div>    
                            {/* <div className="modal-footer">
                                <Pagination onChange={this.pagination} current={current} total={25} />    
                            </div> */}
                    </div>                            
                        
                </section>           
            </Fragment>
        )
    }
}
index.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired, 
    fab: PropTypes.object.isRequired,    
    setStakehViewTrue: PropTypes.func.isRequired,
    setStakehViewFalse: PropTypes.func.isRequired,   
    setShowFab: PropTypes.func.isRequired,   
    setActivePage: PropTypes.func.isRequired,
    setStakeholderItemDetail: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired,
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehAccess: PropTypes.func.isRequired,    
    setDelBtn: PropTypes.func.isRequired,   
    bcDet: PropTypes.func.isRequired,
    bcIndex: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
    setRoleStore: PropTypes.func.isRequired,
    setStakehList: PropTypes.func.isRequired,
    setStkhAccDetail: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setDescendant: PropTypes.func.isRequired,
    setSecLevel: PropTypes.func.isRequired,   
    showMultiFab: PropTypes.func.isRequired,
    
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        fab: state.fab,
       
})
    
export default connect(mapStateToProps,{
    setStakehSel,
    setStakehViewTrue,
    setStakehViewFalse,
    setShowFab,
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,
    viewStakehGroup,
    viewStakehAccess,    
    setDelBtn,
    bcDet,
    bcIndex,
    setWizardPage, 
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setSecLevel,    
    showMultiFab,
   
})(index)