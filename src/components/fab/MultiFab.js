import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeMultiSel,setSelAll } from '../../actions/fabAction'
import {setDelBtn,viewStakehMember,viewStakehGroup} from '../../actions/stakeholderAction/stakehViewDetail'
import {newStakehType} from '../../actions/stakeholderAction/stakehTypeAction'
import {setActivePage} from '../../actions/layoutInitAction'
import {setWizardPage,setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel} from '../../actions/stakeholderAction/stakehUpdateAction'  

 

class MultiFab extends Component {
       

    setIsMulti=(e)=>{
        e.preventDefault()
        switch(e.target.name){

            case 'enableMulti':
                // console.log('enableMulti')
                this.props.changeMultiSel(true)
            break

            case 'disableMulti':
                // console.log('disable multi')
                this.props.changeMultiSel(false)
            break

            case 'selectAll':
                // console.log('select all rec')
                this.props.setSelAll(true)
            break   

            default:
                this.props.stakehAction(e.target.name)                 
            break

        }
    } 

   

     


  render() {
      const{isMultiSel} = this.props.fab
    //   const{activePage}=this.props.layout
    //   console.log(isMultiSel)

    return (
        <div className="fab">
            <span className={!isMultiSel?"fab-action-button":"d-none"}>
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Enable multi select</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                    <img name="enableMulti" src={require('../../img/fab-multi.svg')} alt='enableMulti' className='img-fluid' onClick={this.setIsMulti}/>
                </Tooltip>
            </span>

            <span className={isMultiSel?"fab-action-button":"d-none"}>
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Disable multi select</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                    <img name="disableMulti" src={require('../../img/fab-multi-cancel.svg')} alt='disableMulti' className='img-fluid' onClick={this.setIsMulti} />
                </Tooltip>
            </span>
            
        <ul className="fab-buttons">
            <li className={isMultiSel?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Stakeholder</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="deleteMulti" src={require('../../img/fab-trash.svg')} alt='deleteMulti' className='img-fluid' onClick={this.setIsMulti} />
                    </Tooltip>
                </span>
            </li>
 

            <li className={isMultiSel?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                    <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Select All</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                        <img name="selectAll" src={require('../../img/fab-multiAll.svg')} alt='selAll' className='img-fluid' onClick={this.setIsMulti} />
                    </Tooltip>
                </span>
            </li>

        </ul>
    </div>
    )
  }
}

MultiFab.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    fab: PropTypes.object.isRequired,
    changeMultiSel:PropTypes.func.isRequired,
    setSelAll:PropTypes.func.isRequired,
    setDelBtn:PropTypes.func.isRequired,
    newStakehType:PropTypes.func.isRequired,
    setWizardPage:PropTypes.func.isRequired,
    setActivePage:PropTypes.func.isRequired,
    setRoleStore:PropTypes.func.isRequired,
    setStakehList:PropTypes.func.isRequired,
    setStkhAccDetail:PropTypes.func.isRequired,
    setAncestor:PropTypes.func.isRequired,
    setDescendant:PropTypes.func.isRequired,
    setSecLevel:PropTypes.func.isRequired,  
    viewStakehMember:PropTypes.func.isRequired,
    viewStakehGroup:PropTypes.func.isRequired,
     
  }
const mapStateToProps = state => ({
    fab:state.fab,
    layout:state.layout,
    stakeholderlistType:state.stakeholderlistType,
    session:state.session
})

export default connect(mapStateToProps,{
    changeMultiSel,
    setSelAll,
    setDelBtn,
    newStakehType,
    setWizardPage,
    setActivePage,
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setSecLevel,  
    viewStakehMember,
    viewStakehGroup,

})(MultiFab)