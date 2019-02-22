import React, { Component, Fragment } from 'react'
import posed, {PoseGroup} from 'react-pose'

import Dashboard from '../components/dashboard/Dashboard'
import addStakeholder from '../components/stakeholder/add/AddStakeholder' 
import index from '../components/stakeholder/index'
import ViewDetail from '../components/stakeholder/view/ViewDetail'
import UpdateDetail from '../components/stakeholder/update/UpdateDetail'
import MainMulti from '../components/stakeholder/multi/MainMulti'
import addChild from '../components/stakeholder/addChild/AddStakeholder'
import search from '../components/stakeholder/search/search'
import ListWorkflow from './workflow/ListWorkflow'  
import SearchWorkflow from './workflow/searchWorkflow/modal/SearchWorkflow'
import NewActivity from './workflow/create/NewActivity'
import WorkflowDetails from './workflow/update/WorkflowDetails'
// import Log from './auditTrail/auditLog/index'
// import PrintPage from './auditTrail/auditLog/PrintPage'
// import PrintReport from './auditTrail/modal/PrintReport'
// import PrintUsage from './auditTrail/modal/PrintUsage'
// import PrintStatistic from './auditTrail/modal/PrintStatistic';

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavToggle,setPageClass, setSideNavClass} from '../actions/layoutInitAction'
import {Footer, SideNav, TopNav} from '../components/layouts'


const RouteContainer = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
          y: { type: 'spring', stiffness: 1000, damping: 15 },
          default: { duration: 300 }
        }
      },
      exit: {
        y: 50,
        opacity: 0,
        transition: { duration: 150 }
      },
  })

class Home extends Component {    

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
    }
    updateDimensions=()=>{
        const windowWidth=window.innerWidth
        const pageClass = windowWidth > 1194 ? 'page active' : 'page active-sm'
        const navClass =  windowWidth > 1194 ? 'side-navbar shrink' : 'side-navbar show-sm'

        this.props.setNavToggle(false, pageClass, navClass)
    }

    components={
        'dashboard' : Dashboard,

        //stakeholder
        'addStakeholder' : addStakeholder,                
        'index' : index,
        'viewStakeh': ViewDetail,
        'edit': UpdateDetail, 
        'deleteMulti': MainMulti,
        'addChild': addChild,  
        'search': search,   

        //workflow
        'listOfWorkflow':ListWorkflow,
        'searchWorkflow': SearchWorkflow,

        'createNewAct': NewActivity,
        'viewActivity': WorkflowDetails,
        'createNewAct': NewActivity,
        'view': WorkflowDetails,

        //auditTrail
        // 'log':Log,        
        // 'print' : PrintPage,
        // 'printReport': PrintReport,
        // 'printUsage': PrintUsage,
        // 'printStat' : PrintStatistic,
        
        
    }
     

  render() {       
      const {pageClass,activePage:pName}=this.props.layout                
      const Page=this.components[pName]
    return (
        <Fragment>
            <SideNav/>
                <div className={pageClass}>
                    <TopNav/>
                        {/* <PoseGroup>
                            <RouteContainer key={pName}> */}
                                <Page/>
                            {/* </RouteContainer>
                        </PoseGroup> */}
                    <Footer/>
                </div>
    </Fragment>
    )
  }
}
Home.propTypes={
    layout:PropTypes.object.isRequired,
    setNavToggle:PropTypes.func.isRequired,
    setPageClass:PropTypes.func.isRequired,
    setSideNavClass:PropTypes.func.isRequired,
  }
  const mapStateToProps= state =>({
    layout:state.layout
  })
  export default connect(mapStateToProps, {setPageClass,setSideNavClass,setNavToggle})(Home)