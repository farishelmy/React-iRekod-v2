import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import {setGroup,setRmvGroup,updListGroup,setAncestor,setMember,setRmvMember,updListMember} from '../../../actions/stakeholderAction/stakehUpdateAction' 
import CloseBtn from '../../stakeholder/update/UpdateCloseBtn'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
 

class GroupMember extends Component {
    constructor(){
        super()
        this.state={
            listItemGroup:[],
            listItemMember:[],
            groupVal:[],  
            memberVal:[],  
                    
        }
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.listAncestor!==this.props.stakeholderUpdate.listAncestor){
            const {listAncestor}=this.props.stakeholderUpdate      
                // console.log(listAncestor)                     
                const ancestor = listAncestor!==undefined?listAncestor.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name) })):"Cannot Select"
                // console.log(stakehOptions)
            this.setState({ 
                listItemGroup:ancestor
            })
        } 
        if(prevProps.stakeholderUpdate.listDescendant!==this.props.stakeholderUpdate.listDescendant){
            const {listDescendant}=this.props.stakeholderUpdate      
                // console.log(listDescendant)                     
                const descendant = listDescendant!==undefined?listDescendant.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name) })):listDescendant
                // console.log(descendant)
            this.setState({ 
                listItemMember:descendant
            })
        }
        if(prevProps.stakeholderView.stakeholderGroup!==this.props.stakeholderView.stakeholderGroup){
            const {stakeholderGroup} = this.props.stakeholderView

            const group = stakeholderGroup.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)} ))
                // console.log(group)
            this.setState({
                groupVal: group                
            })
        }
        if(prevProps.stakeholderView.stakeholderMember!==this.props.stakeholderView.stakeholderMember){
        const {stakeholderMember} = this.props.stakeholderView

            const member = stakeholderMember.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)}))

            this.setState({
                memberVal: member
            })
        }      
    }

    handleGroupChange=(value)=>{
        // value.length>1?alert('You may only select 1'):this.setState({groupVal: value}) 
        this.setState({groupVal: value})   
        // console.log(value)
    } 
    
    handleMemberChange=(value)=>{
        this.setState({memberVal:value})
        // console.log(value)
    }
     

    formSubmit=(e)=>{
        e.preventDefault()
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel:{stakeholder_id}} = this.props.stakeholderlistType
        const {stakeholderGroup,stakeholderMember} = this.props.stakeholderView
        const {groupVal,memberVal}= this.state

        // console.log(groupVal)
        // console.log(stakeholderGroup)
        
     


        //Group
        if(groupVal.length >= stakeholderGroup.length ) {    
         

            groupVal.forEach((x,idx)=>{
                const groupSource = {
                    action: "ADD_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.value,  
                    child_id: stakeholder_id,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setGroup(groupSource)
            })
        }

        if(groupVal.length < stakeholderGroup.length ) {           
            
            const valA = groupVal.reduce((groupVal,{value}) => Object.assign(groupVal, {[value]:value}), {})
            // console.log(valuesA)

            const valB = stakeholderGroup.reduce((groupVal,{stakeholder_id}) => Object.assign(groupVal, {[stakeholder_id]:stakeholder_id}), {})
            // console.log(valuesB)

            const result = [...groupVal.filter(({value}) => !valB[value]), ...stakeholderGroup.filter(({stakeholder_id}) => !valA[stakeholder_id])]
            // console.log(result);
            
            result.forEach((x,idx)=>{
                const groupSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.stakeholder_id,  
                    child_id: stakeholder_id,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setRmvGroup(groupSource)                
            })           
        }

        if (groupVal.length === 0 ){
            stakeholderGroup.forEach((x,idx)=>{
                const groupSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.stakeholder_id,  
                    child_id: stakeholder_id,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setRmvGroup(groupSource)
                 
            })
        }

        //Member
        if(memberVal.length >= stakeholderMember.length  ) {     
            memberVal.forEach((x,idx)=>{
                const memberSource = {
                    action: "ADD_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakeholder_id,  
                    child_id: x.value               
                }
                this.props.setMember(memberSource)
            })
        }

        if(memberVal.length < stakeholderMember.length  ) {      
            
            const valA = memberVal.reduce((memberVal,{value}) => Object.assign(memberVal, {[value]:value}), {})
            // console.log(valuesA)

            const valB = stakeholderMember.reduce((memberVal,{stakeholder_id}) => Object.assign(memberVal, {[stakeholder_id]:stakeholder_id}), {})
            // console.log(valuesB)

            const result = [...memberVal.filter(({value}) => !valB[value]), ...stakeholderMember.filter(({stakeholder_id}) => !valA[stakeholder_id])]
            // console.log(result);
            
            result.forEach((x,idx)=>{
                const memberSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakeholder_id,  
                    child_id: x.stakeholder_id                             
                }
                this.props.setRmvMember(memberSource)
                
            })      
            
           
        }

        if (memberVal.length === 0 ){
            stakeholderMember.forEach((x,idx)=>{
                const memberSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakeholder_id,  
                    child_id: x.stakeholder_id                                
                }
                this.props.setRmvMember(memberSource)
               
            })

            
        }
        if (groupVal.length!==stakeholderGroup.length)
        {
            alert("Sucessful")
        }
        if (memberVal.length!==stakeholderMember.length)
        {
            alert("Sucessful")
        }
     
      

    }
    

  render() {

    const active = this.props.active
    const item = this.props.item
    const {listItemGroup,listItemMember,groupVal,memberVal} = this.state

  

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Group & Associate</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/StakeType/'+ item.stakeh_type_name +'.svg')} alt={item.stakeh_type_name} className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="row">
                            <div className="js-view col-lg-6 col-md-6 col-sm-6">
                                <label className="test">Group</label>
                                    <Select
                                        options={listItemGroup}
                                        onChange={this.handleGroupChange}
                                        value={groupVal} 
                                        isMulti
                                        placeholder="Group"/>                                 
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <label>Associate</label>
                                    <Select 
                                        options={listItemMember}
                                        onChange={this.handleMemberChange}
                                        value={memberVal} 
                                        isMulti
                                        placeholder="Associate"/>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={active==='group'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <CloseBtn/>
                    {/* <button type="button" className="btn btn-secondary">Close</button> */}
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
GroupMember.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setGroup: PropTypes.func.isRequired,
    setRmvGroup: PropTypes.func.isRequired,
    updListGroup: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setMember: PropTypes.func.isRequired,
    setRmvMember: PropTypes.func.isRequired,
    updListMember: PropTypes.func.isRequired,
     

   
    
     
}

const mapStateToProps= state =>({
    session:state.session,
    stakeholderlistType:state.stakeholderlistType,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    stakeholderUpdate: state.stakeholderUpdate

        
         
})
    
export default connect(mapStateToProps,{
    setGroup,
    setRmvGroup,
    updListGroup,
    setAncestor,
    setMember,
    setRmvMember,
    updListMember
    
})(GroupMember)