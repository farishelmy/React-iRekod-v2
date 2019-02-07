import React, { Component,Fragment } from 'react'
import Card from '../dashboard/Card'  
import {setActivePage,setPageTitle} from '../../actions/layoutInitAction'
import {setStakehType,setStakehNumb} from '../../actions/stakeholderAction/stakehTypeAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Dashboard extends Component {

  setActivePage=(value)=>{
   console.log(value)
    // const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session

    // // this.props.setActivePage(e.target.getAttribute('data-pagename'))
    // // this.props.setPageTitle(e.target.getAttribute('data-pagetitle'))
    // // this.props.setStakehNumb(e.target.getAttribute('data-id'))
    // // console.log(e.target.getAttribute('data-pageTitle'))     

    // const stakehObj={
    //   stakeholder_id:bId,
    //   bio_access_id:idAccess,
    //   action:'ITEM_LIST_TYPE',
    //   stakeh_type: parseInt(e.target.getAttribute('data-id')),
    // }

    // this.props.setStakehType(stakehObj) 
  }

  render() {
    

  return (
      <Fragment>
         <div className="breadcrumb-holder">
            <div className="container-fluid">        
              <div className="breadcrumb">           
                <h4 className="text-primary"><strong>DASHBOARD</strong></h4>  
              </div>
            </div>
        </div>           
             
        

       
            <Card
              setActivePage={this.setActivePage}
              // setPageTitle={this.setActivePage}
              // setStakehNumb={this.setActivePage}
              />


          
        
  
      </Fragment>
    )
  }
}
Dashboard.propTypes={
  session: PropTypes.object.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  stakeholderView: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired, 
  
 
  
   
}

const mapStateToProps= state =>({
      session:state.session,
      stakeholderlistType:state.stakeholderlistType,
      layout:state.layout,
      stakeholderView: state.stakeholderView,
      
       
})
  
export default connect(mapStateToProps,{
 
 
  
})(Dashboard)
