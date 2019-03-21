import React, { Component,Fragment } from 'react'
import '../../../css/ViewDetail.css'
import MemberView from '../../stakeholder/view/MemberView'
// import GroupView from '../../stakeholder/view/GroupView'
// import AccessView from '../../stakeholder/view/AccessView'
import {setActivePage} from '../../../actions/layoutInitAction' 
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess} from '../../../actions/stakeholderAction/stakehViewDetail'
import {setStakehType,setStakehSel,setStakehNumb,stakehSelObj} from '../../../actions/stakeholderAction/stakehTypeAction'
import {setRoleStore,setStkhAccDetail,setAncestor,setDescendant,setSecLevel} from '../../../actions/stakeholderAction/stakehUpdateAction'
import Breadcrumb from '../../layouts/Breadcrumb'
import {setNewBread} from '../../../actions/breadcrumbAction'

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

  setPageView=(sId,name,typeName)=>{    
     
    const {user:{_id:bId}} = this.props.session
    const val = ({sId,typeName,name})  
    
    this.props.setNewBread(false,{
      id:sId,
      typeName:typeName,
      label:name, 
      activePage:'viewStakeh', 
      isActive:true,
  })
    
    // console.log(sId)
    // console.log(stakehObj)
    
    this.props.setStakehSel(sId) 
    this.props.setStakehNumb(typeName)

    //stkh Detail     
    this.props.setStakeholderItemDetail(val)       

    //Stakeh Obj   
    this.props.stakehSelObj(val)

     //Member
     const stakehMember={
      _action:'LISTLOCATION',   
      _id: bId, 
      URI: sId, 
      ANODE:"A"             
    }
    this.props.viewStakehMember(stakehMember)

    //Group
    const stakehGroup={
            stakeholder_id:sId,
            // bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
    }
    this.props.viewStakehGroup(stakehGroup)






  }  

  componentDidUpdate(prevProps){     
    //   if(prevProps.stakeholderView.stakeholderDetail!==this.props.stakeholderView.stakeholderDetail){
    //         const {stakeholderDetail:[{acl_entries}]}=this.props.stakeholderView
    //         this.setState({aclEntries:acl_entries})
    //     }    
    // if(prevProps.stakeholderView.stakeholderGroup!==this.props.stakeholderView.stakeholderGroup){
    //         const {stakeholderGroup}=this.props.stakeholderView
    //         // console.log(stakeholderGroup)
    //         this.setState({groupItem:stakeholderGroup})
    //     }
    // if(prevProps.stakeholderView.stakeholderMember!==this.props.stakeholderView.stakeholderMember){
    //         const {stakeholderMember}=this.props.stakeholderView
    //         console.log(stakeholderMember)
    //         this.setState({memberItem:stakeholderMember})
    //     }        
    }    

     
    updDetail=(e)=>{
      e.preventDefault()   

      
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
    console.log(stakeholderDetail)
    // console.log(memberItem)
    // const {stakehSel} = this.props.stakeholderlistType
    // console.log(stakeholderMember)    
      
    return (
      <Fragment>
         <div className="breadcrumb-holder">
            <div className="container-fluid">
              <Breadcrumb/>
            </div>
        </div>        

        <div className="container-fluid mt-3"> 
          <header>                                   
            <h1 className="h3 display mb-3">{stakeholderDetail.name}</h1>                                                      
          </header>        
            
            <div className="row"> 

              <div className="col-lg-4">
                <div className="card card-profile">
                  <div style={{backgroundImage: `url(${require('../../../img/Background/'+ stakeholderDetail.typeName +'.jpg')})` }} className="card-header"></div>
                  <div className="card-body text-center"><img src={require('../../../img/Icon/'+ stakeholderDetail.typeName +'.svg')} className="card-profile-img"/>
                    <h3 className="mb-3">{stakeholderDetail.name}</h3>
                      <p className="mb-4"><img className="userIcon mr-2" src={require('../../../img/role.svg')} alt="type"/>Type: {stakeholderDetail.typeName ===""?"N/A":stakeholderDetail.typeName} </p>  
                        <div className={stakeholderMember.length!==0?"card-title text-center":"d-none"}>
                          <hr/> 
                          <h3>Members</h3>
                        </div>                                       
                          <div className={stakeholderMember.length!==0?"card-body":"d-none"}>                   
                            {stakeholderMember!==[0]?stakeholderMember.map((item,idx)=><MemberView 
                                key={idx} 
                                stkhId={item.uri}  
                                stakehType={item.iconCls}                                     
                                fullName={item.Name}
                                typeName={item.iconCls}
                                setActivePage={this.setPageView} />):"No Member Items" }                                               
                          </div>
                  </div>                            
                </div>
              </div>
            
              {/* <div className="col-lg-4">
                <div className="card card-profile">
                  <div style={{backgroundImage: `url(${require('../../../img/Background/'+ stakeholderDetail.typeName +'.jpg')})` }} className="card-header"></div>
                    <div className="card-body text-center"><img src={require('../../../img/Icon/'+ stakeholderDetail.typeName +'.svg')} className="card-profile-img"/>
                      <h3 className="mb-3">{stakeholderDetail.name}</h3>
                        <hr/>
                          <p className="mb-4"><img className="userIcon mr-2" src={require('../../../img/role.svg')} alt="type"/>Type: {stakeholderDetail.typeName ===""?"N/A":stakeholderDetail.typeName} </p>                  
                    </div>
                </div>             

              
                <div className={stakeholderMember.length===0?"d-none":"card"}>
                  <div className={stakeholderMember.length!==0?"card-header":"d-none"}>
                    <h3>Associates</h3>
                  </div>       
                    <div className="card-body row">                    
                      <div className="col">  
                          {stakeholderMember!==[0]?stakeholderMember.map((item,idx)=><MemberView 
                              key={idx} 
                              stkhId={item.uri}  
                              stakehType={item.iconCls}                                     
                              fullName={item.Name}
                              typeName={item.iconCls}
                              setActivePage={this.setPageView} />):"No Member Items" } 
                      </div>                          
                    </div> 
                  </div>  

              </div>                 */}

            <div className="col-lg-8">
              <form id="simpleform" name="simpleform" >

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">My Profile</h3>
                </div>
                <div className="card-body">                   
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" value={stakeholderDetail.name} placeholder="First name" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">User Type</label>
                    <input type="text" value={stakeholderDetail.typeName} placeholder="User Type" className="form-control"/>
                  </div>               
                </div>
                <div className="card-footer text-right">
                  <button className="btn btn-primary mr-2">Save</button>
                  <button className="btn btn-secondary">Cancel</button>
                </div>
              </div>           
                                                            
            </form>
          </div> 
        </div>            
      </div>
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
  stakehSelObj: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  
  
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
    stakehSelObj,
    setNewBread
    

})(ViewDetail)
