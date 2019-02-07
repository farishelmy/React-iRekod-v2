import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// import ViewDetail from '../components/stakeholder/view/ViewDetail'

import {setActivePage} from '../../actions/layoutInitAction' 
import {setStakehType} from '../../actions/stakeholderAction/stakehTypeAction'
import {setStkhAccDetail,setAncestor,setDescendant} from '../../actions/stakeholderAction/stakehUpdateAction'
import {viewStakehGroup,viewStakehMember} from '../../actions/stakeholderAction/stakehViewDetail'
import {bcUpd} from '../../actions/stakeholderAction/stakehBreadCrumbAction'

class BreadcrumbStakeh extends Component {     

    setActivePage=(e)=>{
        e.preventDefault()     
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehNumb} = this.props.stakeholderlistType
  
        this.props.setActivePage(e.target.getAttribute('data-pagename'))        
       
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
        }
        this.props.setStakehType(stakehObj) 
        
     
    }    

    DetailPage=(e)=>{
        e.preventDefault()     

        this.props.bcUpd(false)
        this.props.setActivePage(e.target.getAttribute('data-pagename'))


        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehSel:{stakeholder_id},stakehNumb} = this.props.stakeholderlistType
        // console.log(stakehNumb)   
       
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
        }
        this.props.setStakehType(stakehObj) 

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

        //Member
        const stakehMember={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
        }
        this.props.viewStakehMember(stakehMember)

         //List Group
         const stakehGroup={
            stakeholder_id:stakeholder_id,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
        }
        this.props.viewStakehGroup(stakehGroup)

        // this.handleWizard()
         
       


    }  
    
    // components={
    //     'viewStakeh': ViewDetail
    // }


  render() {
    const {pageTitle}=this.props.layout
    const {stakeholderDetail} = this.props.stakeholderView     
    const {bcIndex,bcDet,bcUpd} = this.props.stakeholderBreadCrumb
    // const Page=this.components[pName]   

    return (

    <div className="breadcrumb-holder">
        <div className="container-fluid">
            <ul className="breadcrumb">
                <a className="breadcrumb-item" href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a> 
                {stakeholderDetail.map((item,idx)=><a key={idx} className={bcIndex?"breadcrumb-item active":"breadcrumb-item"} href='/' data-pagename="index" onClick={this.setActivePage}>{bcIndex?decodeURIComponent(item.full_name):pageTitle}</a>)} 
                <a className={bcDet?"breadcrumb-item":"d-none"} href='/' data-pagename="viewStakeh" onClick={this.DetailPage}>Details</a>
                {stakeholderDetail.map((item,idx)=><div key={idx} className={bcUpd?"breadcrumb-item active":"d-none"}>{decodeURIComponent(item.full_name)}</div>)}
            </ul>
        </div>
    </div> 

 
 
    )
  }
}
BreadcrumbStakeh.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderBreadCrumb: PropTypes.object.isRequired,   
    setStakehType: PropTypes.func.isRequired,
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired,
    setStkhAccDetail: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setDescendant: PropTypes.func.isRequired,    
    bcUpd: PropTypes.func.isRequired,
    
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    stakeholderBreadCrumb: state.stakeholderBreadCrumb,
    stakeholderlistType: state.stakeholderlistType,
    
    


  })
  export default connect(mapStateToProps,{
    setActivePage,
    setStakehType,
    viewStakehGroup,
    viewStakehMember,
    setStkhAccDetail,
    setAncestor,
    setDescendant,    
    bcUpd

    })(BreadcrumbStakeh)
