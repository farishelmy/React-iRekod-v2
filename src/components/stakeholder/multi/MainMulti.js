import React, { Component,Fragment } from 'react' 
import DeleteWizard from '../../stakeholder/multi/DeleteWizard'
import FolTabHead from '../../stakeholder/multi/FolTabHead'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel,setWizardPage} from '../../../actions/stakeholderAction/stakehUpdateAction'
import {setActivePage} from '../../../actions/layoutInitAction' 
import {setStakehType} from '../../../actions/stakeholderAction/stakehTypeAction'
import {viewStakehGroup,viewStakehMember} from '../../../actions/stakeholderAction/stakehViewDetail'
import BreadCrumb from '../../layouts/BreadcrumbStakeh' 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class MainMulti extends Component {

    handleWizard=(wizardName)=>{        
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel:{stakeholder_id},stakehNumb} = this.props.stakeholderlistType  
        // console.log(stakehNumb)
        
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
 
    components={        
        "deleteMulti":DeleteWizard     

        // icon:{
        //     delete:`fab-trash.svg`,
        //     move:`fab-move.svg`
        // }
    }

  

  render() {
     
    const {wizardPage:wzdPage,containerLine} = this.props.stakeholderUpdate     
    const Body=this.components[wzdPage]
    // const icon = this.components.icon[type]      
    
    return (
         
        <Fragment>

        <BreadCrumb/>    

        <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">Delete Stakeholder</h1>
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
MainMulti.propTypes={
    session: PropTypes.object.isRequired,  
    layout:PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired, 
    stakeholderList: PropTypes.object.isRequired,   
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
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired, 
    
 
  }
  
  const mapStateToProps= state =>({
        session: state.session,      
        layout: state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderlistType: state.stakeholderlistType,
        stakeholderUpdate: state.stakeholderUpdate,
        stakeholderList: state.stakeholderList,
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
    viewStakehGroup,
    viewStakehMember,
    
       
  
  })(MainMulti)
