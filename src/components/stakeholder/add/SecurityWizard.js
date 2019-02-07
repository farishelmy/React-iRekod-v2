import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import Checkbox from 'rc-checkbox'
import DatePicker from "react-datepicker"
import moment from 'moment'
import {addStkh} from '../../../actions/stakeholderAction/stakehAddAction'
import CloseBtn from '../../stakeholder/add/AddCloseBtn'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import 'rc-checkbox/assets/index.css'
import "react-datepicker/dist/react-datepicker.css"
 


class securityWizard extends Component {   
    constructor(){
        super()
        this.state={              
            role_list:[],                        
            secList:[],                      
            internal: false,
            is_blocked: false,
            can_login: false,
            login_username: null,
            password: null,
            role_value: null,
            role_id: null,
            security_level_value: null,
            security_level_id: null,
            active: false,
            startDate: null,
            endDate: null 
              
        }
    }       
    
    handleChange=(event)=>{
        // e.preventDefault()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;     
                
        this.setState({
            [name]:value
        })  
        // console.log(input)  
        // console.log(value)
    }    

    handleDateChange = ({ startDate, endDate }) => {
        // console.log(startDate, endDate)
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)){
            endDate = startDate
        }
        this.setState({ startDate, endDate})
       
    }

    handleChangeStart = (startDate) => this.handleDateChange({ startDate })

    handleChangeEnd = (endDate) => this.handleDateChange({ endDate })


    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.roleStore!==this.props.stakeholderUpdate.roleStore){
            const {roleStore}=this.props.stakeholderUpdate                        
            const roleOptions = roleStore.map(itm=>({ value: itm.role_id, label:itm.title}))           
            // console.log(roleOptions)
            this.setState({ 
                role_list:roleOptions                
            })
        }
        if(prevProps.stakeholderUpdate.securityLevel!==this.props.stakeholderUpdate.securityLevel){
            const {securityLevel} = this.props.stakeholderUpdate                           
            // console.log(securityLevel)   
            const secLevel = securityLevel.map(itm=>({ value: itm.security_level_id, label: itm.title }))            
            // console.log(secLevel)  
            this.setState({
                secList:secLevel               
            })
        }                 
    }    

    handleRoleChange=(value)=>{
        // console.log(value)
        this.setState({roleVal:value})  
        // console.log(value)
    }

    handleSecLevelChange=(value)=>{       
        this.setState({secVal:value})  
        // console.log(value)
    }

    formSubmit=(e)=>{
        e.preventDefault()         
        const {user:{bio_access_id:idAccess}} = this.props.session        
        const {startDate,endDate,login_username,internal,is_blocked,can_login,active,roleVal:{value:role_id,label:role_value},password,secVal:{value:security_level_id,label:security_level_value}}=this.state
        const {basicDet:{stakeh_type_name:type,stakeh_type,initials,first_name,last_name,full_name,email,date_of_birth},stakehId} = this.props.stakeholderAdd         
        // console.log(stakehId)

        const formObj={                       
            stakeh_type_name: type,
            stakeh_type: stakeh_type,
            initials: initials,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            email: email,
            date_of_birth: date_of_birth,

            internal: internal,
            is_blocked: is_blocked,
            can_login: can_login,
            login_username: login_username,
            password: password,
            role_value: role_value,
            role_id: role_id,
            security_level_value: security_level_value,
            security_level_id: security_level_id,
            active: active,
            date_active_from: moment(startDate).format("DD/MM/YYYY"),
            date_active_to: moment(endDate).format("DD/MM/YYYY"), 
            
            version: 0,           
            stakeholder_id: stakehId,
            bio_access_id: idAccess,
            // acl_id:acl_id,
            // acl_entries:acl_entries,
            // custom_field:custom_field,          
        }
        this.props.addStkh(formObj)
        console.log(formObj)
      
        // for ( const propName in formObj)
        // if (formObj[propName] === "" || formObj[propName] === undefined ){
        //     formObj[propName] = null
           
        // }   

        alert("Successful Created")
    }
     

  render() {
    
    // const item = this.props.item   
    const active1 = this.props.active    
    const {role_list,secList,can_login,active,internal,is_blocked,startDate,endDate}=this.state
    // console.log(startDate, endDate)  
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Security</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/add.svg')} alt='add'className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">                    
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>Role</label>
                                <Select 
                                    options={role_list}
                                    onChange={this.handleRoleChange}                                                               
                                    placeholder="Role"/> 
                            </div>
                            <div className="form-group col-sm-6">
                                <label>Security Level</label>
                                <Select 
                                    options={secList}
                                    onChange={this.handleSecLevelChange}                                   
                                    placeholder="Security Level" /> 
                            </div>                                                 
                        </div>
                      <div className="form-group">                           
                          <div className="i-checks">
                            <input name="active" type="checkbox" checked={active} onChange={this.handleChange}  />    
                                <label>Active</label>
                          </div>
                        </div>
                        <label>Date Active Range</label>
                            <div className="row">
                            <div className="col-sm-6 form-group">
                                <DatePicker
                                    placeholderText="Date Start"
                                    selected={startDate}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={this.handleChangeStart}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"/>
                                </div>
                                <div className="col-sm-6 form-group">
                                <DatePicker
                                    placeholderText="Date End"
                                    selected={endDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={this.handleChangeEnd}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"/>
                                </div>                     
                            </div>
                        <div className="form-group row">
                            <div className="i-checks col-sm-2">
                                <input name="internal" type="checkbox" checked={internal} onChange={this.handleChange}   />
                                <label>Internal</label>
                            </div>
                            <div className="i-checks col-sm-2">
                                <input name="is_blocked" type="checkbox" checked={is_blocked} onChange={this.handleChange}   />
                                <label>Is Blocked</label>
                            </div>
                            <div className="i-checks col-sm-2">
                                <input name="can_login" type="checkbox" checked={can_login} onChange={this.handleChange}   />
                                <label>Can Login</label>
                            </div>
                        </div>
                        <div className={can_login===null||can_login=== false?"d-none":"autoUpdate row"}>
                            <div className="col-sm-6 form-group">
                                <label>Username</label>
                                <input type="text" name="login_username" className="form-control" onChange={this.handleChange}/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Password</label>
                                <input name="password" type="password" onChange={this.handleChange} className="form-control" />
                            </div>
                        </div>  
                    </div>
                </div>
                <div className={active1==='security'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <CloseBtn/>                   
                </div>
            </form>
                {/* <Loader
                    modalIsOpen={this.state.openLoader}
                    loaderText={this.state.loaderText}
                /> */}
      </Fragment>
    )
  }
}
securityWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired, 
    stakeholderAdd: PropTypes.object.isRequired, 
    layout: PropTypes.object.isRequired,
    addStkh: PropTypes.func.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderUpdate: state.stakeholderUpdate,
        stakeholderAdd: state.stakeholderAdd

         
})
    
export default connect(mapStateToProps,{
    addStkh,
    
    
})(securityWizard)