import React,{ Component,Fragment } from 'react' 
import Select from 'react-select'
import {updStkh} from '../../../actions/stakeholderAction/stakehUpdateAction'
import CloseBtn from '../../stakeholder/update/UpdateCloseBtn'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class accessWizard extends Component {   
    constructor(){
        super()
        this.state={
             multiSel:[],
             accessList:[],
             accViewVal:[],
             accUpdVal:[],
             accRmvVal:[],
             accModVal:[],             
             stakehList:[],  
             acl_id:null,                
             
        }
    }       
    
    handleViewChange=(value)=>{
        this.setState({accViewVal:value})
        console.log(value)
    }

    handleUpdChange=(value)=>{
        this.setState({accUpdVal:value})
        // console.log(value)
    }

    handleRemoveChange=(value)=>{
        this.setState({accRmvVal:value})
        // console.log(value)
    }

    handleModifyChange=(value)=>{
        this.setState({accModVal:value})
        // console.log(value)
    }     

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderList.stakehList!==this.props.stakeholderList.stakehList){
            const {stakehList}=this.props.stakeholderList      
                // console.log(stakehList)                     
            const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))
                // console.log(stakehOptions)                
                
            this.setState({ 
                stakehList:stakehOptions
            })
        }
        if(prevProps.stakeholderView.stakeholderDetail!==this.props.stakeholderView.stakeholderDetail){
            const {acl_id} = this.props.item
            this.setState({
                acl_id:acl_id          
            })      
        }
        if(prevProps.stakeholderUpdate.stkhDetail!==this.props.stakeholderUpdate.stkhDetail){
            const {stakeholderDetail:[{acl_entries}]}=this.props.stakeholderView  
              
            if(acl_entries!==undefined){
                function acl_multi(array) {
    
                    const res = {
                        view: [],
                        update: [],
                        remove: [],
                        modify_access: []
                    }
                
                    const keys = Object.keys(array[0])
                
                    for (let i = 0; i < array.length; i++) {
                        keys.forEach(function (key) {
                            if (key !== 'stakeholder_name' && key !== 'stakeholder_id' && key !== 'stakeholder_type_id') {
                                if (array[i][key]) {
                                    res[key].push({
                                        stakeholder_name: array[i].stakeholder_name,
                                        stakeholder_id: array[i].stakeholder_id,
                                        stakeholder_type_id: array[i].stakeholder_type_id                                       
                                    })
                                }
                            }
                        })
                    }
                    return res
                }   
    
                let { view, update, remove, modify_access: aclMod } = acl_multi(acl_entries) // returns object. Push to array if so desired 
                //  console.log(acl_entries)
                
                const accView = view.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), type: itm.stakeholder_type_id}))
                //  console.log(view)
    
                const accUpd = update.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name),   type: itm.stakeholder_type_id}))
                //  console.log(accView)
    
                const accRmv = remove.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), type: itm.stakeholder_type_id}))
                //  console.log(accView)
    
                const accMod = aclMod.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name),   type: itm.stakeholder_type_id}))
                //  console.log(accView)
                
                this.setState({ 
                    accViewVal:accView,
                    accUpdVal:accUpd,
                    accRmvVal:accRmv,
                    accModVal:accMod,
                })       
            }
          
        }      
    }       

    formSubmit=(e)=>{
        e.preventDefault()        
        const {stakehSel:{stakeholder_id}} = this.props.stakeholderlistType  
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {acl_id} = this.state
        const {stakeh_type_name,stakeh_type,initials,first_name,last_name,full_name,email,date_of_birth,internal,is_blocked,can_login,login_username,password,role_value,role_id,security_level_value,security_level_id,active,date_active_from,date_active_to} = this.props.item
      
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
            role_value: role_value,
            role_id: role_id,
            security_level_value: security_level_value,
            security_level_id: security_level_id,
            active: active,
            date_active_from: date_active_from,
            date_active_to: date_active_to,  

            version: 0,           
            stakeholder_id: stakeholder_id,
            bio_access_id: idAccess,
            acl_id: acl_id,
            acl_entries: this.Aclselected(),
            // custom_field:custom_field,     
        }        
        this.props.updStkh(formObj)
        // console.log(formObj)
        alert('Successful')
         
    }

    Aclselected=()=>{
        const {accViewVal, accUpdVal, accRmvVal, accModVal} = this.state    
        // console.log(accViewVal)      
        // console.log(accViewVal)
        const viewSource = accViewVal.map(item =>({
            stakeholder_id: item.value,
            stakeholder_name: item.label,
            stakeholder_type_id: item.value,
            attach: false,
            modify_access: false,
            remove: false,
            remove_child: false,
            update: false,
            update_child: false,
            view: true,
            view_child: false,
            index: -1,
            depth: 0,
            expanded: false,
            expandable: true,
            checked: null,
            leaf: false,
            cls: null,
            iconCls: null,
            icon: null,
            root: false,
            isLast: false,
            isFirst: false,
            allowDrop: true,
            allowDrag: true,
            loaded: false,
            loading: false,
            href: null,
            hrefTarget: null,
            qtip: null,
            qtitle: null,
            qshowDelay: 0,
            children: null
        }))       

        // console.log(viewSource)   
        const update = this.acl_builder(accUpdVal, viewSource, 'update')    
        // console.log(update)    
        const remove = this.acl_builder(accRmvVal, update, 'remove')
        // console.log(remove)   
        const modAcl = this.acl_builder(accModVal, remove, 'modify_access')
        // console.log(modAcl)                        

        if (modAcl === undefined)
        {
            // modAcl = null  
            this.setState({
                acl_id:null
            })           
        }

        // console.log(modAcl) 

        return modAcl
    }

    ///////////////////////////////////recursive function//////////////////////////////////////////
    acl_builder=(selData,aclEntries,type)=>{  
        // console.log(selData)         
        // console.log(aclEntries)          
        selData.map(item=>
           {const TargetItem = aclEntries.findIndex(rec=>rec.stakeholder_id===item.value) 
            // console.log(TargetItem)
            if ( TargetItem!==-1) {
                aclEntries[TargetItem][type] = true
            } 
            else {
                var aclObj =
                    {                             
                        stakeholder_id: null,
                        stakeholder_name: null,
                        stakeholder_type_id: null,
                        attach: false,
                        modify_access: false,
                        remove: false,
                        remove_child: false,
                        update: false,
                        update_child: false,
                        view: false,
                        view_child: false,
                        index: -1,
                        depth: 0,
                        expanded: false,
                        expandable: true,
                        checked: null,
                        leaf: false,
                        cls: null,
                        iconCls: null,
                        icon: null,
                        root: false,
                        isLast: false,
                        isFirst: false,
                        allowDrop: true,
                        allowDrag: true,
                        loaded: false,
                        loading: false,
                        href: null,
                        hrefTarget: null,
                        qtip: null,
                        qtitle: null,
                        qshowDelay: 0,
                        children: null
                    }
            aclObj.stakeholder_id= item.value  
            aclObj.stakeholder_name=  item.label  
            aclObj.stakeholder_type_id= item.type  
            aclObj[type]=true
            aclEntries.push(aclObj)
            }              
        })          
        return aclEntries   
    }

    
 

  render() {
  
    // console.log(acl_entries)
    const item = this.props.item
    const active = this.props.active
    // const item = this.props.item
    const {accViewVal, accUpdVal, accRmvVal, accModVal, stakehList} = this.state
    // console.log(item)

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Access Control</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/StakeType/'+ item.stakeh_type_name +'.svg')} alt={item.stakeh_type_name} className="img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="row">
                            <div className="js-view col-lg-6 col-md-6 col-sm-6">
                                <label className="test">View</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleViewChange}
                                    value={accViewVal} 
                                    isMulti
                                    placeholder="View"/>                                 
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <label>Update</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleUpdChange}
                                    value={accUpdVal} 
                                    isMulti
                                    placeholder="Update"/>                                
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                <label>Remove</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleRemoveChange}
                                    value={accRmvVal} 
                                    isMulti
                                    placeholder="Remove"/>                                  
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                <label>Modify</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleModifyChange}
                                    value={accModVal} 
                                    isMulti
                                    placeholder="Modify"/>                                          
                            </div>
                        </div> 
                    </div>
                </div>
                <div className={active==='access'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <CloseBtn/>
                    {/* <button type="button" className="btn btn-secondary" onClick={this.ActivePage} data-pagename="viewStakeh">Close</button> */}
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
accessWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderList: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout:PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
    updStkh: PropTypes.func.isRequired,
     
   
    
     
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
     
    

    
})(accessWizard)