import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setStakehSel,setShowFab} from '../../actions/stakeholderAction/stakehTypeAction'
// import {setSelWorkFlow} from '../../actions/workflowAction/authListWorkFlow'
import {setActivePage,setPageTitle,setPageSubject} from '../../actions/layoutInitAction'
import {setStakehType,setStakehNumb,setStakehLabel} from '../../actions/stakeholderAction/stakehTypeAction'
// import {setListWorkFlow,setListofSubject} from '../../actions/workflowAction/authListWorkFlow'
import {setStakehList} from '../../actions/stakeholderAction/stakehListAction'
// import {setCustomField} from '../../actions/workflowAction/workflowDetailAction'
// import {toggleErr} from '../../actions/auditTrailAction/modalAction'
import {setNewBread} from '../../actions/breadcrumbAction'


 

class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {
      workFlowToggle: false,
      stakehToggle: false,
      activityToggle: false,
      // documentToggle: false,
      // uploadToggle:false,     
    };

  }
  toggleClass=(e)=> {
    e.preventDefault()
    switch(e.target.name){
      case 'stakeholder':
        const stakehState = this.state.stakehToggle
        this.setState({ stakehToggle: !stakehState, workFlowToggle:false,activityToggle:false})
        break
      case 'workflow':
        const workflowState = this.state.workFlowToggle
        this.setState({ workFlowToggle: !workflowState, stakehToggle:false,activityToggle:false})        
      break 
      case 'activity': 
        const activityState = this.state.activityToggle
        this.setState({ activityToggle: !activityState, stakehToggle:false, workFlowToggle:false})        
      break 
      default:
    }
  }

  setActivePage=(e)=>{
      e.preventDefault()

      /////////////////////////////stakeholder////////////////////////////////////
      const {user:{_id:bId}} = this.props.session       

      const stakehList={
        _action: "LISTLOCATION",
        _id:bId,        
      }
      this.props.setStakehType(stakehList)   
    
      this.props.setNewBread(true,{
          id:'index', 
          label:`Locations`, 
          activePage:'index', 
          isActive:true,
      })  

      // this.props.setPageTitle(e.target.getAttribute('data-pageTitle'))
      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      this.props.setStakehLabel(e.target.getAttribute('data-label'))
      this.props.setStakehNumb(e.target.getAttribute('data-label'))     
      this.props.setStakehSel(null)  // ID stakeholder select to null
      this.props.setShowFab(false) // Fab True false
      // this.props.setSelWorkFlow(null)  //ID select for workflow     

      ///////////////////////////////workflow////////////////////////////////////

      // const listWrkFlwObj ={
      //   action: 'ITEM_LIST',
      //   bio_access_id: idAccess
      // }

      // const listofSubjectObj ={
      //   action: 'LIST_ITEM_SUBJECT',
      //   bio_access_id: idAccess
      // }
  
      // const stakehList={
      //   action: "ITEM_LIST",
      //   bio_access_id: idAccess       
      // }
  
      // const customFieldObj={
      //   action: "ITEM_LIST_BY_OBJECT",
      //   bio_access_id: idAccess,
      //   object_id:"STKH"    
      // }
   
      const pageSubject= ""
      // this.props.setStakehList(stakehList)
      // this.props.setListWorkFlow(listWrkFlwObj)
      // this.props.setListofSubject(listofSubjectObj)
      this.props.setPageTitle(e.target.getAttribute('data-pageTitle'))
      // this.props.setCustomField(customFieldObj)
      this.props.setPageSubject(pageSubject)
      this.props.setStakehSel(null)    // ID stakeholder select
      this.props.setShowFab(false)  // Fav True False
      // this.props.setSelWorkFlow(null)     //ID select for workflow  


    //   ////////////////////////////////Audit Trail////////////////////////////////////

    //   const pgName = e.target.getAttribute('data-pagename')
    //     this.props.setActivePage(pgName)
    //     this.props.setStakehSel(null)  // ID stakeholder select
    //     this.props.setShowFab(false)  // Fav True False
    //     this.props.setSelWorkFlow(null)      //ID select for workflow  
                
    //     if(pgName==='log')
    //     {
    //       this.props.toggleErr(true)
    //     }  

    //     if(pgName==='print')
    //     {
    //       this.props.toggleErr(true)
    //     }

       
  
      

  } 
  
  render() {

      const {navBarClass}=this.props.layout
      const {user:{sortname:name,usertype:role}}=this.props.session
       
    return (
    <nav className={navBarClass}>

      <div className="side-navbar-wrapper">

        <div className="sidenav-header d-flex align-items-center justify-content-center">

          <div className="sidenav-header-inner text-center">
            <img src={require('../../img/user.svg')} alt="user" className="img-fluid "/>
            <h2 className="h5">{name}</h2>
            <span>{role}</span>
          </div>

          <div className="sidenav-header-logo">
            <a className="brand-small text-center" href='/' onClick={this.setActivePage} data-pagename="dashboard">
              <img src={require('../../img/user.svg')} alt="user" className="img-fluid " data-pagename="dashboard" />
            </a>
          </div>

        </div>

        <div className="main-menu">
          <h5 className="sidenav-heading text-center">Main</h5>
          <ul id="side-main-menu" className="side-menu list-unstyled">

          {/* Dashboard */}
          <li>
            <a href="/" onClick={this.setActivePage} data-pagename="dashboard">
              <div className="userIcon" data-pagename="dashboard">
                <img src={require('../../img/StakeType/Dashboard.svg')} alt="dashboard" className="img-fluid mr-1" data-pagename="dashboard"/>
              </div>Dashboard
            </a>
          </li>

          {/* Locations */}
          <li>
            <a href="/" onClick={this.setActivePage} data-pagename="index" data-id="All" data-label="All Locations">
              <div className="userIcon" data-pagename="index">
                <img src={require('../../img/employee.svg')} alt="employee" className="img-fluid mr-1" data-pagename="index"/>
              </div>Locations
            </a>
          </li>

             {/* List Of WorkFlow */}
            <li>
              <a href="/" aria-expanded={this.state.workFlowToggle} data-toggle="collapse" name="workflow" className={this.state.workFlowToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require('../../img/folder.svg')} alt="doc" className="img-fluid p-1"/></div>Workflow </a>
              <ul id="chartsDropdown" className={this.state.workFlowToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                      <a href="/" onClick={this.setActivePage} data-pagename="listOfWorkflow" data-pagetitle="List Workflow" >
                      <div className="userIcon" data-pagename="listOfWorkflow">
                      <img src={require('../../img/search.svg')} alt="doc" className="img-fluid p-1" data-pagename="listOfWorkflow" name="List Workflow" />
                      </div>List of Workflow
                      </a>
                </li>
                <li>
                      <a href="/" onClick={this.setActivePage} data-pagename="SearchWorkflow" data-pagetitle="Search Workflow" >
                      <div className="userIcon" data-pagename="listOfWorkflow">
                      <img src={require('../../img/loupe.svg')} alt="doc" className="img-fluid p-1" data-pagename="SearchWorkflow" name="Search Workflow" />
                      </div>Search Workflow
                      </a>
                </li>
              </ul>
            </li>

            {/* List Of Activity */}
            <li>
              <a href="/" aria-expanded={this.state.activityToggle} data-toggle="collapse" name="activity" className={this.state.activityToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require('../../img/folder.svg')} alt="doc" className="img-fluid p-1"/></div>Activity </a>
              <ul id="chartsDropdown" className={this.state.activityToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                      <a href="/" onClick={this.setActivePage} data-pagename="listOfActivity" data-pagetitle="List Activity" >
                      <div className="userIcon" data-pagename="listOfActivity">
                      <img src={require('../../img/search.svg')} alt="doc" className="img-fluid p-1" data-pagename="listOfActivity" name="List Activity" />
                      </div>List of Activity
                      </a>
                </li>
                <li>
                      <a href="/" onClick={this.setActivePage} data-pagename="SearchActivity" data-pagetitle="Search Activity" >
                      <div className="userIcon" data-pagename="SearchActivity">
                      <img src={require('../../img/loupe.svg')} alt="doc" className="img-fluid p-1" data-pagename="SearchActivity" name="Search Activity" />
                      </div>Search Activity
                      </a>
                </li>
              </ul>
            </li>

            {/* Stakeholder */}
            {/* <li>
              <a href="/" aria-expanded={this.state.stakehToggle} data-toggle="collapse" name="stakeholder" className={this.state.stakehToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require('../../img/employee.svg')} alt="employee" className="img-fluid p-1"/></div>Stakeholder </a>
              <ul id="chartsDropdown" className={this.state.stakehToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                  <a href="/" onClick={this.setActivePage} data-id='0' data-pagetitle="Group" data-pagename="index">
                    <div className="userIcon" data-pagename="index">
                        <img src={require('../../img/StakeType/Group.svg')} alt="group" className="img-fluid mr-1" data-pagename="index" data-pagetitle="Group"/>
                    </div>Group
                  </a>
                </li>
                <li>
                    <a href="/" onClick={this.setActivePage} data-id='1' data-pagetitle="Organization" data-pagename="index">
                    <div className="userIcon" data-pagename="index">
                    <img src={require('../../img/StakeType/Organization.svg')} alt="organization" className="img-fluid mr-1" data-pagename="index" data-pagetitle="Organization" />
                    </div>Organization
                    </a>
                </li>   
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='2' data-pagetitle="Branch" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Branch.svg')} alt="branch" className="img-fluid mr-1" data-pagename="index" data-pagetitle="Branch"/>
                      </div>Branch
                      </a>
                </li> 
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='3' data-pagetitle="Department" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Department.svg')} alt="department" className="img-fluid mr-1" data-pagename="index" data-pagetitle="Department"/>
                      </div>Department
                      </a>
                </li> 
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='4' data-pagetitle="Designation" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Designation.svg')} alt="designation" className="img-fluid mr-1" data-pagename="index" data-pagetitle="Designation" />
                      </div>Designation
                      </a>
                </li>      
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='5' data-pagetitle="User" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/User.svg')} alt="user" className="img-fluid mr-1" data-pagename="index" data-pagetitle="User" />
                      </div>User
                      </a>
                </li>       
              </ul>
            </li>  */}       

          </ul>
        </div>
      </div>
    </nav>


    );
  }
}

SideNav.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setStakehType: PropTypes.func.isRequired,
    setStakehNumb: PropTypes.func.isRequired,
    // setListWorkFlow: PropTypes.func.isRequired,
    // setListofSubject: PropTypes.func.isRequired,
    setStakehList: PropTypes.func.isRequired,
    // setCustomField: PropTypes.func.isRequired,
    setPageSubject: PropTypes.func.isRequired, 
    // toggleErr: PropTypes.func.isRequired,
    setStakehSel: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired, 
    // setSelWorkFlow: PropTypes.func.isRequired,    
    setStakehLabel: PropTypes.func.isRequired,

    
    setNewBread: PropTypes.func.isRequired,
    

  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderlistType:state.stakeholderlistType
    


  })
  export default connect(mapStateToProps,{
    setActivePage,
    setStakehType,
    setPageTitle,
    setStakehNumb,
    // setListWorkFlow,
    // setListofSubject,
    setStakehList,
    // setCustomField,
    setPageSubject,
    // toggleErr,
    setStakehSel,
    setShowFab,
    // setSelWorkFlow,     
    setStakehLabel,
  
    setNewBread
    
    
  })
  (SideNav)
