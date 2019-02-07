import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import { Alert } from "reactstrap"
import {updStkh,setWizardPage} from '../../../actions/stakeholderAction/stakehUpdateAction'
import {setDelBtn} from '../../../actions/stakeholderAction/stakehViewDetail'
import {newStakehType} from '../../../actions/stakeholderAction/stakehTypeAction'
import {newStakehList} from '../../../actions/stakeholderAction/stakehListAction'
import {setActivePage} from '../../../actions/layoutInitAction' 


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import "react-datepicker/dist/react-datepicker.css"

class deleteWizard extends Component {  
    
    formSubmit=(e)=>{
        e.preventDefault()
        const {stakehNumb,stakehType,stakehSel:{stakeholder_id}} = this.props.stakeholderlistType
        const {activePage,pageTitle} = this.props.layout    
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session    
        const {stakehList} = this.props.stakeholderList  
        //  console.log(stakehNumb)       

        const stakehObj={
            bio_access_id:idAccess,
            stakeholder_ids:[stakeholder_id]        
        }
        this.props.setDelBtn(stakehObj)
            alert("Successful Deleted") 
        
        const updStakehType = stakehType.filter(x=>x.stakeholder_id !== stakeholder_id) 
        this.props.newStakehType(updStakehType) //Update Stakeh Type      

        const updStakehList = stakehList.filter(x=>x.stakeholder_id !== stakeholder_id) 
        this.props.newStakehList(updStakehList) //Update Stakeh List
        
        this.props.setActivePage("index") //return to page index
        this.props.setWizardPage("basic")    
                          
    }
      
  render() {     
    const {pageTitle} = this.props.layout
    const item = this.props.item
    const active = this.props.active    
    // console.log(rows)
    
    return (
      <Fragment>
        <h1 className="h3 display text-danger text-center">Delete ({item.full_name})</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/warn-del.svg')} alt='warn-del' className=" img-dash" />
                        </div>
                    </div>
                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">                       
                       
                            <p className='h3 display mt-4'>Warning: this cannot be undone.</p>
                            <p className='mt-4'>Once you delete stakeholder ({item.full_name}), there is no getting back.</p>
                            <p>Make sure you want to do this.</p>
                                                  
                        </div>
                </div>
                <div className="modal-footer">   
                    <button type="submit" className="btn btn-danger">Delete</button>                 
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </div>
            </form>                
      </Fragment>
    )
  }
}
deleteWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderList:  PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,   
    stakeholderUpdate: PropTypes.object.isRequired, 
    updStkh: PropTypes.func.isRequired,
    setDelBtn: PropTypes.func.isRequired, 
    newStakehType: PropTypes.func.isRequired, 
    newStakehList: PropTypes.func.isRequired, 
    setActivePage: PropTypes.func.isRequired, 
    setWizardPage: PropTypes.func.isRequired,
    
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderUpdate: state.stakeholderUpdate,
        stakeholderList: state.stakeholderList
         
})
    
export default connect(mapStateToProps,{
    updStkh,
    setDelBtn,
    newStakehType,
    newStakehList,
    setActivePage,
    setWizardPage
        

    
})(deleteWizard)