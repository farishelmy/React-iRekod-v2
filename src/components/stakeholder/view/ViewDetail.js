import React, { Component,Fragment } from 'react'
import '../../../css/ViewDetail.css'
import MemberView from '../../stakeholder/view/MemberView'
import GroupView from '../../stakeholder/view/GroupView'
import AccessView from '../../stakeholder/view/AccessView'
import {setActivePage} from '../../../actions/layoutInitAction' 
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess} from '../../../actions/stakeholderAction/stakehViewDetail'
import {setStakehType,setStakehSel,setStakehNumb} from '../../../actions/stakeholderAction/stakehTypeAction'
import {setRoleStore,setStkhAccDetail,setAncestor,setDescendant,setSecLevel} from '../../../actions/stakeholderAction/stakehUpdateAction'
import BreadCrumb from '../../layouts/BreadcrumbStakeh'
import {bcDet,bcUpd} from '../../../actions/stakeholderAction/stakehBreadCrumbAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
 

class ViewDetail extends Component {    
  constructor(){
      super()
      this.state={
        aclEntries:[],
        groupItem:null,
        memberItem:[],     
      }
  }

  setPageView=(stkhId,type)=>{    
     
    const {user:{bio_access_id:idAccess}} = this.props.session
    
    // console.log(stkhId)
    // console.log(type)
    
    this.props.setStakehSel(stkhId) 
    this.props.setStakehNumb(type)

    //stkh Detail
    const stakehDet={
        stakeholder_id:stkhId,
        bio_access_id:idAccess,
        action:'ITEM_DETAIL',            
    }
    this.props.setStakeholderItemDetail(stakehDet)    

     //Member
     const stakehMember={
        stakeholder_id:stkhId,
        bio_access_id:idAccess,
        action:'ITEM_LIST_MEMBER',             
   }
   this.props.viewStakehMember(stakehMember)

    //Group
    const stakehGroup={
            stakeholder_id:stkhId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
    }
    this.props.viewStakehGroup(stakehGroup)
  }  

  componentDidUpdate(prevProps){
      if(prevProps.stakeholderView.stakeholderDetail!==this.props.stakeholderView.stakeholderDetail){
            const {stakeholderDetail:[{acl_entries}]}=this.props.stakeholderView
            this.setState({aclEntries:acl_entries})
        }    
    if(prevProps.stakeholderView.stakeholderGroup!==this.props.stakeholderView.stakeholderGroup){
            const {stakeholderGroup}=this.props.stakeholderView
            // console.log(stakeholderGroup)
            this.setState({groupItem:stakeholderGroup})
        }
    if(prevProps.stakeholderView.stakeholderMember!==this.props.stakeholderView.stakeholderMember){
            const {stakeholderMember}=this.props.stakeholderView
            // console.log(stakeholderMember)
            this.setState({memberItem:stakeholderMember})
        }        
    }  

  updDetail=(e)=>{
      e.preventDefault()   

      this.props.bcUpd(true)  //breadcrumb condition
    //   this.props.bcDet(false) //breadcrumb condition
      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      //console.log(('data-pagename'))

      const {user:{bio_access_id:idAccess}} = this.props.session
      const {stakehSel:{stakeholder_id},stakehNumb} = this.props.stakeholderlistType  
      // console.log(stakehNumb)     
            
      //Role List
      const RoleObj={
          action: "ITEM_LIST",
          bio_access_id: idAccess      
      }
      this.props.setRoleStore(RoleObj)     

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
   
    const {pageTitle}=this.props.layout
    const {stakeholderDetail,stakeholderMember} = this.props.stakeholderView
    const {aclEntries,groupItem,memberItem}=this.state
    // console.log(groupItem)
    // console.log(memberItem)
    // const {stakehSel} = this.props.stakeholderlistType
    // console.log(aclEntries)    
      
    return (
      <Fragment>
            <BreadCrumb/>

        {/* <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a></div>
                    {stakeholderDetail.map((item,idx)=><div key={idx} className="breadcrumb-item active">{decodeURIComponent(item.full_name)}</div>)}
                </div>
            </div>
        </div>   */}

    {/* iterate */}
    {stakeholderDetail.map((item,idx)=>      

        <div key={idx} className="container-fluid mt-3"> 
             <header>
                 <div className="row">
                     <div className="col-auto mr-auto">
                         <h1 className="h3 display">{decodeURIComponent(item.full_name)}</h1>
                     </div>
                     <div className="col-auto mr-4">                        
                        <span>
                        <Tooltip                            
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Update Details</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                            <img src={require('../../../img/fab-update.svg')} alt="Edit Details" data-pagename="edit" className='btn btn-link' onClick={this.updDetail}/>
                        </Tooltip>
                        </span>                         
                     </div>                     
                 </div>
             </header>
         
               <div className="content">

                 <div className="row">                       
        
                     <div className="col-lg-4 col-md-4 col-sm-4">
                         <div className="card card-user">
                             <div className="card-image">
                                <img src={require('../../../img/ImgBackground/'+ item.stakeh_type_name +'.jpg')} alt={item.stakeh_type_name} />
                             </div>
                             <div className="card-body">
                                 <div className="author">
                                     <span>                                        
                                        <img src={require('../../../img/StakeType/'+ item.stakeh_type_name +'.svg')} className="avatar border-gray" alt="..."/>
                                        <h5 className="title">{decodeURIComponent(item.full_name)}</h5>
                                     </span>
                                 </div>
                                 <p className="description text-center">
                                    <label><img className="userIcon mr-2" src={require('../../../img/email.svg')} alt="email"/>{decodeURIComponent(item.email)} </label>
                                    <br />
                                    <label ></label>
                                 </p>
                                 <div> 
                                    <hr/>
                                 </div>
                                 <h5 className="title text-center">Associate</h5>                                    
                                    {memberItem!==[0]?memberItem.map((item,idx)=><MemberView 
                                        key={idx} 
                                        stkhId={item.stakeholder_id}  
                                        stakehType={item.stakeh_type}                                     
                                        fullName={item.full_name}
                                        typeName={item.stakeh_type_name}
                                        setActivePage={this.setPageView} />):"No Member Items" } 
                                         
                             </div>
                         </div>
                     </div>

                     <div className="col-lg-8 col-md-8 col-sm-8">

                         <form id="simpleform" name="simpleform">

                             <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Group</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <div className="row">
                                            {groupItem!==null?groupItem.map((item,idx)=><GroupView 
                                                    key={idx} 
                                                    stkhId={item.stakeholder_id}                                       
                                                    fullName={item.full_name}
                                                    typeName={item.stakeh_type_name}
                                                    stakehType={item.stakeh_type}  
                                                    setActivePage={this.setPageView}/>):"No Group Items"} 
                                            </div>
                                        </div>
                                     </div>
                                 </div>
                             </div>

                             <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light flex-column">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Access Control</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className="col-lg-12 col-md-12 col-sm-12">                                        
                                            <div className="row">                                                                                                           
                                                {aclEntries!==undefined?aclEntries.map((item,idx)=><AccessView
                                                    key={idx} 
                                                    stkhId={item.stakeholder_id}                                       
                                                    fullName={item.stakeholder_name}
                                                    typeName={item.stakeholder_type_id}                                                      
                                                    setActivePage={this.setPageView}                                   
                                                />):''}
                                            </div>
                                         </div>
                                     </div>                                     
                                 </div>                                 
                             </div>
                             {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light flex-column">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Custom Field</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className="col-lg-12 col-md-12 col-sm-12">                                        
                                            <div className="row">                                                                                                           
                                                
                                            </div>
                                         </div>
                                     </div>                                     
                                 </div>                                 
                             </div>                             */}
                         </form>
                     </div> 
                 </div>              
             </div> 
        </div>)}
      </Fragment>
    )
  }
}
ViewDetail.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  stakeholderView: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setStakeholderItemDetail: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired,
  viewStakehGroup: PropTypes.func.isRequired,
  viewStakehAccess: PropTypes.func.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  setStakehType: PropTypes.func.isRequired,
  setStakehSel: PropTypes.func.isRequired,
  setStakehNumb: PropTypes.func.isRequired,
  setRoleStore: PropTypes.func.isRequired,
  setStkhAccDetail: PropTypes.func.isRequired,
  setAncestor: PropTypes.func.isRequired,
  setDescendant: PropTypes.func.isRequired,
  setSecLevel: PropTypes.func.isRequired,
  bcDet: PropTypes.func.isRequired,
  bcUpd: PropTypes.func.isRequired,
  
  
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      stakeholderView: state.stakeholderView,
      stakeholderlistType:state.stakeholderlistType,
})
  
export default connect(mapStateToProps,{
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,
    viewStakehGroup,
    viewStakehAccess,
    setStakehType,
    setStakehSel,
    setStakehNumb,
    setRoleStore,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setSecLevel,
    bcDet,
    bcUpd
    

})(ViewDetail)
