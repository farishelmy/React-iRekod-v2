import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import update from "immutability-helper"
import { setBread, resetNav, backPrev } from "../../actions/breadcrumbAction"
import { setActivePage } from "../../actions/layoutInitAction"
import {setStakehType} from "../../actions/stakeholderAction/stakehTypeAction"
// import { setPageTitle } from '../../actions/recordAction'
// import { getAdvSearch } from "../../actions/searchAction"
// import { setActiveEditor } from "../../actions/editorAction"

class Breadcrumb extends Component {
  componentDidMount() {
    this.generateBreadNav(this.props.breadcrumb)
    // console.log('bread is mounted')
    // console.log(this.props.breadcrumb)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.breadcrumb.newBread !== this.props.breadcrumb.newBread) {
      // console.log('new bread added')
      this.generateBreadNav(this.props.breadcrumb)
      

    } else if (prevProps.breadcrumb.prevNav !== this.props.breadcrumb.prevNav) {
      //remove current nav
      console.log("init back nav")
      const { prevNav } = this.props.breadcrumb
      if (prevNav) {
        const { breadList } = this.props.breadcrumb
        console.log(breadList)
        const selNavIdx = breadList.findIndex(list => list.isActive === true)
        const filterBread = breadList.slice(0, selNavIdx)
        const newNav = update(filterBread, {
          [selNavIdx - 1]: { isActive: { $set: true } }
        })

        this.props.setBread(newNav)
        const { activePage } = newNav[selNavIdx - 1]
        if (activePage === "folEditor") {
          const { activeEditor } = newNav[selNavIdx - 1]
          // console.log(activePage)
          this.props.setActivePage(activePage)
          // this.props.setPageTitle(pageTitle)
          // this.props.setActiveEditor(activeEditor)
        } else {
          this.props.setActivePage(activePage)
        }

        this.props.resetNav()
        this.props.backPrev(false)
      }
    }
  }

  generateBreadNav({ breadList, newBread, isParent }) {
    if (isParent) {
      const newNav =
        breadList < 1
          ? update(breadList, { $push: [newBread] })
          : update(breadList, { $splice: [[1, 3, newBread]] })
      this.props.setBread(newNav)
    } else {
      // console.log(breadList.find(link=>link.id===newBread.id))
      if (Object.keys(newBread).length !== 0) {
        if (breadList.find(link => link.id === newBread.id) === undefined) {
          // console.log(Object.keys(newBread).length)
          const newNav = update(breadList, {
            $push: [newBread],
            [breadList.length - 1]: { isActive: { $set: false } }
          })
          this.props.setBread(newNav)
        }
      }
    }
  }

  breadNavNavigatior = e => {
    e.preventDefault()
    const { breadList } = this.props.breadcrumb
    const navId = e.target.getAttribute("data-id")
    console.log(navId)
    const selNavIdx = breadList.findIndex(list => list.id === navId)
    console.log(selNavIdx)

    if (selNavIdx !== 0) {
      const filterBread = breadList.slice(0, selNavIdx + 1)
      const newNav = update(filterBread, {
        [filterBread.length - 1]: {
          isActive: { $set: true }
        }
      })
      this.props.setBread(newNav)
      this.props.resetNav()
      const selNav = breadList.find(nav => nav.id === navId)
      
      if (selNavIdx === 1) {
        const { page, start, limit, pageTitle, parameter, activePage } = selNav

        // this.props.getAdvSearch(parameter, {
        //   page: page,
        //   start: start,
        //   limit: limit
        // })
        
        this.props.setActivePage(activePage)
        // this.props.setPageTitle(pageTitle)

        const {user:{_id:bId}} = this.props.session
        const {stakehLabel} = this.props.stakeholderlistType
        
        const stakehObj={
          _action:'LISTLOCATION',
          _id:bId,                        
          filterType: stakehLabel,
        }
        this.props.setStakehType(stakehObj)
        
      } 
      else if (selNavIdx >= 2) {
        const { page, start, limit, pageTitle, parameter, activePage } = selNav

        // this.props.getAdvSearch(parameter, {
        //   page: page,
        //   start: start,
        //   limit: limit
        // })
        
        this.props.setActivePage(activePage)
        // this.props.setPageTitle(pageTitle)

        const {user:{_id:bId}} = this.props.session
        const {stakehLabel,stakehSel} = this.props.stakeholderlistType
        const selNav = breadList.find(nav => nav.id === selNavIdx)
        const stakehObj={
          _action:'LISTLOCATION',
          _id:bId, 
          URI:stakehSel,                         
          ANODE: "A",
        }
        console.log(stakehObj)
        this.props.setStakehType(stakehObj)
        
      }else {
        const { pageTitle, activeEditor, activePage } = selNav
        // this.props.setActivePage(activePage)
        if (activeEditor === "child") {
          this.props.setActivePage(activePage)
          // this.props.setPageTitle(pageTitle)
          // this.props.setActiveEditor(activeEditor)
        }
        // console.log(selNav)
      }
    } else {
      this.props.setActivePage("dashboard")       
    }
  }

  render() {
    const { breadList } = this.props.breadcrumb
    // console.log(breadList)
    const breadNav = breadList.map(itm =>
      itm.isActive ? (
        <li key={itm.id} className='breadcrumb-item active'>
          {decodeURIComponent(itm.label)}
        </li>
      ) : (
        <a
          key={itm.id}
          href='/'
          data-id={itm.id}
          onClick={this.breadNavNavigatior}
          className='breadcrumb-item'
        >
          {decodeURIComponent(itm.label)}
        </a>
      )
    )
    return <ul className='breadcrumb'>{breadNav}</ul>
  }
}
Breadcrumb.propTypes = {
  session: PropTypes.object.isRequired,
  breadcrumb: PropTypes.object.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  // search: PropTypes.object.isRequired,
  // records: PropTypes.object.isRequired,
  setBread: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  resetNav: PropTypes.func.isRequired,
  // setPageTitle:PropTypes.func.isRequired,
  // getAdvSearch: PropTypes.func.isRequired,
  // setActiveEditor: PropTypes.func.isRequired,
  backPrev: PropTypes.func.isRequired,
  setStakehType: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
  breadcrumb: state.breadcrumb,
  session: state.session,
  stakeholderlistType: state.stakeholderlistType
  // search:state.search,
  // records:state.records
})

export default connect(
  mapStateToProps,
  {
    setBread,
    setActivePage,
    // setPageTitle,
    resetNav,
    // getAdvSearch,
    backPrev,
    // setActiveEditor
    setStakehType
  }
)(Breadcrumb)
