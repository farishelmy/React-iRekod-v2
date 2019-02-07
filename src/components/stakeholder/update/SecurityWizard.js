import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import Checkbox from 'rc-checkbox'; 
import DatePicker from "react-datepicker";
import moment from 'moment'
import {updStkh} from '../../../actions/stakeholderAction/stakehUpdateAction'
import CloseBtn from '../../stakeholder/update/UpdateCloseBtn'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import 'rc-checkbox/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"

// import '../css/bootstrap-datepicker3.css'


class securityWizard extends Component {   
    constructor(){
        super()
        this.state={              
            role_list:[],
            roleVal:[],  
            secList:[],  
            secVal:[],       
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

    componentWillMount(){
        const {stakeh_type,stakeh_type_name,initials,first_name,last_name,full_name,email,date_of_birth,active,internal,is_blocked,can_login,login_username,password,security_level_id,security_level_value,role_id,role_value,date_active_from,date_active_to} = this.props.item
        const security =({value: security_level_id, label:security_level_value})
        const roleValue = ({value:role_id, label:role_value})
        this.setState({
            stakeh_type_name: stakeh_type_name,            
            initials: initials,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            email: email,
            date_of_birth: date_of_birth,
            stakeh_type: parseInt(stakeh_type),     
            active: active,
            internal: internal,
            is_blocked: is_blocked,
            can_login: can_login,
            login_username:login_username,
            password:password,
            secVal: security,
            roleVal: roleValue,
            startDate: date_active_from,
            endDate: date_active_to, 
        })
    }
    
    handleChange=(event)=>{
        // e.preventDefault()
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name    
                
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

    // handleChangeStart = (value) =>{
    //     this.setState({startDate:value})
    // }

    // handleChangeEnd = (value) =>{
    //     this.setState({endDate:value})
    // }


    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.roleStore!==this.props.stakeholderUpdate.roleStore){
            const {roleStore}=this.props.stakeholderUpdate                    
            const item = this.props.item                 
            const roleOptions = roleStore.map(itm=>({ value: itm.role_id, label:itm.title}))
                // console.log(roleOptions)          
            this.setState({ 
                role_list:roleOptions,                
            })
        }
        if(prevProps.stakeholderUpdate.securityLevel!==this.props.stakeholderUpdate.securityLevel){
            const {securityLevel} = this.props.stakeholderUpdate                            
            const item = this.props.item 
            // console.log(securityLevel)   
            const secLevel = securityLevel.map(itm=>({ value: itm.security_level_id, label: itm.title }))
            // console.log(secLevel)  
            this.setState({
                secList:secLevel,                
            })
        } 
        if(prevProps.stakeholderView.stakeholder_Detail!==this.props.stakeholderView.stakeholder_Detail){
            const {stakeh_type,stakeh_type_name,initials,first_name,last_name,full_name,email,date_of_birth,active,internal,is_blocked,can_login,login_username,password,security_level_id,security_level_value,role_id,role_value,date_active_from,date_active_to} = this.props.item
            const security =({value: security_level_id, label:security_level_value})
            const roleValue = ({value: role_id, label:role_value})
            // console.log(date_active_from,date_active_to)
            this.setState({
                stakeh_type_name: stakeh_type_name,            
                initials: initials,
                first_name: first_name,
                last_name: last_name,
                full_name: full_name,
                email: email,
                date_of_birth: date_of_birth,
                stakeh_type: parseInt(stakeh_type),     
                active: active,
                internal: internal,
                is_blocked: is_blocked,
                can_login: can_login,
                login_username:login_username,
                password:password,
                secVal: security,
                roleVal: roleValue,
                startDate: date_active_from,
                endDate: date_active_to, 
            })      
        }         
    }

    handleRoleChange=(value)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({roleVal:value})
        // console.log(value)
    }

    handleSecLevelChange=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({secVal:param})
        // console.log(value)
    }

    formSubmit=(e)=>{
        e.preventDefault()
        const {stakehSel:{stakeholder_id}} = this.props.stakeholderlistType  
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {startDate,endDate,login_username,internal,is_blocked,can_login,active,roleVal,password,secVal}=this.state
        const {stakeh_type_name,stakeh_type,initials,first_name,last_name,full_name,email,date_of_birth,acl_id,acl_entries} = this.props.item
        // console.log(startDate)

        const formObj={                       
            stakeh_type_name: stakeh_type_name,
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
            role_value: roleVal===null?null:roleVal.label,
            role_id: roleVal===null?null:roleVal.value,
            security_level_value: secVal===null?null:secVal.label,
            security_level_id: secVal===null?null:secVal.value,
            active: active,
            date_active_from: moment(startDate).format("DD/MM/YYYY"),
            date_active_to: moment(endDate).format("DD/MM/YYYY"),  
            
            version: 0,           
            stakeholder_id: stakeholder_id,
            bio_access_id: idAccess,
            acl_id:acl_id,
            acl_entries:acl_entries,
            // custom_field:custom_field,          
        }
        this.props.updStkh(formObj)
        console.log(formObj)

        alert("Succesful")
    }
     

  render() {
    
    // const item = this.props.item    
    const {stakeh_type_name} = this.props.item    
    const active1 = this.props.active    
    const {role_list,roleVal,secList,secVal,startDate,endDate,login_username,internal,is_blocked,can_login,active}=this.state 
    // console.log(roleVal)
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Security</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/StakeType/'+ stakeh_type_name +'.svg')} alt='folder'className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">                    
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>Role</label>
                                <Select 
                                    options={role_list}
                                    onChange={this.handleRoleChange}
                                    value={roleVal===""?null:roleVal} 
                                    placeholder="Role"
                                    isClearable
                                /> 
                            </div>
                            <div className="form-group col-sm-6">
                                <label>Security Level</label>
                                <Select 
                                    options={secList}
                                    onChange={this.handleSecLevelChange}
                                    value={secVal===""?null:secVal} 
                                    placeholder="Security Level"
                                    isClearable/> 
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
                                    selected={startDate!==null?moment(startDate, "DD/MM/YYYY"):startDate}
                                    selectsStart
                                    startDate={startDate!==null?moment(startDate, "DD/MM/YYYY"):startDate}
                                    endDate={endDate!==null?moment(endDate, "DD/MM/YYYY"):endDate}
                                    onChange={this.handleChangeStart}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"/>
                                </div>
                                <div className="col-sm-6 form-group">
                                <DatePicker
                                    placeholderText="Date End"
                                    selected={endDate!==null?moment(endDate, "DD/MM/YYYY"):endDate}
                                    selectsEnd
                                    startDate={startDate!==null?moment(startDate, "DD/MM/YYYY"):startDate}
                                    endDate={endDate!==null?moment(endDate, "DD/MM/YYYY"):endDate}
                                    onChange={this.handleChangeEnd}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"/>
                                </div>
                            </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <input name="internal" type="checkbox" checked={internal} onChange={this.handleChange}   />
                                <label>Internal</label>
                            </div>
                            <div className=" col-sm-2">
                                <input name="is_blocked" type="checkbox" checked={is_blocked} onChange={this.handleChange}   />
                                <label>Is Blocked</label>
                            </div>
                            <div className="col-sm-2">
                                <input name="can_login" type="checkbox" checked={can_login} onChange={this.handleChange}   />
                                <label>Can Login</label>
                            </div>
                        </div>
                        <div className={can_login===null||can_login=== false?"d-none":"autoUpdate row"}>
                            <div className="col-sm-6 form-group">
                                <label>Username</label>
                                <input type="text" name="login_username" className="form-control" onChange={this.handleChange} value={decodeURIComponent(login_username)}/>
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
                    {/* <button type="button" className="btn btn-secondary">Close</button>                    */}
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
    layout: PropTypes.object.isRequired,
    updStkh: PropTypes.func.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderUpdate: state.stakeholderUpdate,

         
})
    
export default connect(mapStateToProps,{
    updStkh,
    
    
})(securityWizard)