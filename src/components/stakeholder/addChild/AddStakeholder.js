import React, { Component,Fragment } from 'react'
import BasicWizard from '../../stakeholder/addChild/BasicWizard'
import SecurityWizard from '../../stakeholder/addChild/SecurityWizard' 
import FolTabHead from '../../stakeholder/addChild/FolTabHeadAdd'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel,setWizardPage} from '../../../actions/stakeholderAction/stakehUpdateAction'
import {setActivePage} from '../../../actions/layoutInitAction' 
import {setStakehType} from '../../../actions/stakeholderAction/stakehTypeAction' 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class NewStakeholder extends Component {

    handleWizard=(wizardName)=>{        
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel:{stakeholder_id},stakehNumb} = this.props.stakeholderlistType  
        // console.log(stakeholder_id)
        
        this.props.setWizardPage(wizardName)
        // console.log(e.target.getAttribute('data-wizardname'))  
        
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

    }     

    components={
        basic:BasicWizard,
        security:SecurityWizard,      
        // icon:{
        //     delete:`fab-trash.svg`,
        //     move:`fab-move.svg`
        // }
    }

    setActivePage=(e)=>{
        e.preventDefault()     
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehNumb} = this.props.stakeholderlistType
        // console.log(stakehNumb)
    
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
    
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
          }
          this.props.setStakehType(stakehObj) 
    }

  render() {

    const {pageTitle}=this.props.layout    
    const {wizardPage:wzdPage,containerLine} = this.props.stakeholderUpdate
    // console.log(item)
    // console.log(active_Wizard)   
  
    const Body=this.components[wzdPage]
    // const icon = this.components.icon[type]      
    
    return (
        <Fragment>
        <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a></div>
                    <div className="breadcrumb-item active">Add Child Stakeholder</div>
                   
                </div>
            </div>
        </div>     
        
        <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">Add Child Stakeholder</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wzdPage}
                                    isContainer={containerLine} />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <Body                                     
                                    active={wzdPage}/>                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
   </Fragment>
    )
  }
}
NewStakeholder.propTypes={
    session: PropTypes.object.isRequired,  
    layout:PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,    
    stakeholderlistType: PropTypes.object.isRequired,   
    setWizardPage: PropTypes.func.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
    setStakehList: PropTypes.func.isRequired,
    setStkhAccDetail: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setDescendant: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setStakehType: PropTypes.func.isRequired,
    setSecLevel: PropTypes.func.isRequired,
    
 
    
     
    
    
  }
  
  const mapStateToProps= state =>({
        session:state.session,      
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderlistType:state.stakeholderlistType,
        stakeholderUpdate:state.stakeholderUpdate,
  })
    
  export default connect(mapStateToProps,{
    setWizardPage,
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setActivePage,
    setStakehType,
    setSecLevel,
   
       
  
  })(NewStakeholder)
