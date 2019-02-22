import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,stakehSelObj,setStakehViewTrue,setStakehViewFalse,setShowFab} from '../../actions/stakeholderAction/stakehTypeAction' 
import {setActivePage} from '../../actions/layoutInitAction'  
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess,setDelBtn} from '../../actions/stakeholderAction/stakehViewDetail'
import {setNewBread} from '../../actions/breadcrumbAction'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel,setWizardPage} from '../../actions/stakeholderAction/stakehUpdateAction'
import {showMultiFab} from '../../actions/fabAction' 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Dropdown from './Dropdown'
import Breadcrumb from '../layouts/Breadcrumb'
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
            loading:true, 
        };
    }   

    componentWillMount(){
        const {stakehType} = this.props.stakeholderlistType      
        this.setState({
            stakeholderlistType:stakehType,             
        })           
              
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
            
                if(stakehType.length!== 0 ){
                    this.setState({loading: false})
                }         
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
                const listSelStakeh=stakeholderlistType.filter(itm => itm.isSel === true).map(itm=>({uri:itm.uri,full_name:itm.Name}))
                this.props.setStakehSel(listSelStakeh)
            }
            else
            {
                const selStakeh=stakeholderlistType.find(itm => itm.isSel === true)
                // console.log(selStakeh)
                if(selStakeh!==undefined){
                    const {uri:uri} = selStakeh
                    this.props.setStakehSel({
                        uri:uri                       
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

    // Selection 
    markOnSel=(sId,name,typeName)=>{

        const val = ({sId,name,typeName}) 
        
        this.props.setStakehSel(sId) // URI 
        this.props.stakehSelObj(val)  //Obj 
         
       

        // console.log(name)
        
        const{isMultiSel}=this.props.fab
        const {stakeholderlistType} = this.state
        // console.log(stakeholderlistType)
        const itmIdx = stakeholderlistType.findIndex(itm=>itm.uri === sId),
            desIdx = stakeholderlistType.findIndex(itm=>itm.isSel===true),
            {isSel:selStakehIsSel}=stakeholderlistType.find(itm=>itm.uri===sId)
      
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

     

    //Fab View Detail
    setActivePage=(param)=>{    
            
        const {stakehSel,stakehObj} = this.props.stakeholderlistType
        const  {user:{_id:bId}} = this.props.session
        // console.log(stakehObj)

        //Breadcrumb
        this.props.setNewBread(false,{
            id:'viewStakeh', 
            label:stakehObj.name, 
            activePage:'viewStakeh', 
            isActive:true,
        })
       
        this.props.setActivePage(param)  //direct page to viewDetail
         

        //stkh Detail        
        this.props.setStakeholderItemDetail(stakehObj)    
        
        //Member
       const stakehMember={
            _action:'LISTLOCATION',   
            _id: bId, 
            URI:stakehSel.uri, 
            ANODE:"A"           
       }
       this.props.viewStakehMember(stakehMember)

    //    //Group
    //    const stakehGroup={
    //         uri:stakehSel,             
    //         action:'ITEM_LIST_GROUP',             
    //    }
    //    this.props.viewStakehGroup(stakehGroup)   
      
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
        const {stakehSel:{uri},stakehNumb} = this.props.stakeholderlistType  
        // console.log(uri)      
       
        //Role List
        const RoleObj={
            action: "ITEM_LIST",
            // bio_access_id: idAccess      
        }
        this.props.setRoleStore(RoleObj)
        
          //Stakeholder List
        const stakehList={
            action:"ITEM_LIST",
            // bio_access_id:idAccess
        }
        this.props.setStakehList(stakehList)

          //stkh Detail
        const stakehDet={
            uri:uri,
            // bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStkhAccDetail(stakehDet)   

        //Ancestor Group
        const listAncestor={
            // bio_access_id: idAccess,
            uri: uri,
            action: "ITEM_LIST_ANCESTOR",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setAncestor(listAncestor)

        //Descendant Member
        const listDescendant={
            // bio_access_id: idAccess,
            uri: uri,
            action: "ITEM_LIST_DESCENDANT",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setDescendant(listDescendant)

        //Security Level
         const SecurityObj={
            action: "ITEM_LIST",
            // bio_access_id: idAccess      
        }
        this.props.setSecLevel(SecurityObj)

        //List Group
        const stakehGroup={
            uri:uri,
            // bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
        }
        this.props.viewStakehGroup(stakehGroup)

         //Member
        const stakehMember={
            uri:uri,
            // bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
        }
        this.props.viewStakehMember(stakehMember)         
    }    

     

    
    render() {
        
        const {stakehView,showFab,stakehNumb,stakehLabel}=this.props.stakeholderlistType
        // const {pageTitle}=this.props.layout
        const {stakeholderlistType}=this.state        
        // const {stakeholder_Detail}=this.props.stakeholderView 
        const {loading} = this.state
        // console.log(loading)
        
        
        
        
        return (
            <Fragment>  
                <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <Breadcrumb/>
                    </div>
                </div>
                
                

                <section>
                    <div className="container-fluid">
                        <header>
                        <div className="d-flex bd-highlight">
                            <h1 className="h3 display p-2 flex-grow-1 bd-highlight"><strong>{stakehLabel}</strong></h1>                        
                          
                            <div className="p-2 bd-highlight col-md-3"><Dropdown/></div> 
                         
                                <div className="p-2 bd-highlight d-flex align-items-center">                          

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
                                
                                {/* Preloaders */}
                                {loading===false?<div className="display-none"/>
                                :<div className="container-fluid">
                                    <div className="d-flex justify-content-center mb-5">
                                        <div className="sk-circle">
                                            <div className="sk-circle1 sk-child"/>
                                            <div className="sk-circle2 sk-child"/>
                                            <div className="sk-circle3 sk-child"/>
                                            <div className="sk-circle4 sk-child"/>
                                            <div className="sk-circle5 sk-child"/>
                                            <div className="sk-circle6 sk-child"/>
                                            <div className="sk-circle7 sk-child"/>
                                            <div className="sk-circle8 sk-child"/>
                                            <div className="sk-circle9 sk-child"/>
                                            <div className="sk-circle10 sk-child"/>
                                            <div className="sk-circle11 sk-child"/>
                                            <div className="sk-circle12 sk-child"/>
                                        </div>
                                    </div>
                                </div>}


                                {stakeholderlistType.map(item=>stakehView?
                                 
                                    <DetailCard                                         
                                        key={item.uri} 
                                        stakehId={item.uri}
                                        name={item.Name}
                                        typeName={item.iconCls}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />:

                                    <CardRow                                         
                                        key={item.uri} 
                                        stakehId={item.uri}
                                        name={item.Name}
                                        typeName={item.iconCls}
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
    breadcrumb: PropTypes.object.isRequired,
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
    setWizardPage: PropTypes.func.isRequired,
    setRoleStore: PropTypes.func.isRequired,
    setStakehList: PropTypes.func.isRequired,
    setStkhAccDetail: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setDescendant: PropTypes.func.isRequired,
    setSecLevel: PropTypes.func.isRequired,   
    showMultiFab: PropTypes.func.isRequired,
    stakehSelObj: PropTypes.func.isRequired,   
    setNewBread: PropTypes.func.isRequired,  
    
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        fab: state.fab,
        breadcrumb: state.breadcrumb
       
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
    setWizardPage, 
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setSecLevel,    
    showMultiFab,
    stakehSelObj,
    setNewBread
   
})(index)