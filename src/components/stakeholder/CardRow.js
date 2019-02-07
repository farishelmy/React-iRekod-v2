import React from 'react'  
import posed from 'react-pose'


export default function CardRow({stakehId,name,typeName,isSel,markOnSel}) {
  const sendStakehId=()=>{
    markOnSel(stakehId)       
  }
   
   
  const Card = posed.div({
    hoverable: true,
    pressable: false,
    init: {
      scale: 1,
      boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
    //   scale: 1,
      boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
      scale: 1.2,
      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
  });

    
    
    // const iconType = is_container ? 'container' : (record_type_icon==='document' ? (haveParent!=='' ? 'hasParent':record_type_icon) : record_type_icon),
       
  return (
    
        // <div data-id={stakehId} data-name={name} className="col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
        //     <div className={isSel?"d-flex justify-content-start align-items-center bg-primary":"d-flex justify-content-start align-items-center"} onClick={sendStakehId}>
        //         <img src={require('../img/StakeType/'+ typeName +'.svg')} alt="person" className="img-list" />              
        //         <p className={isSel?"ml-2 text-truncate text-light":"ml-2 text-truncate"}>{name}</p>                                        
        //     </div>
        // </div>      
         
        <div className="col-6 col-md-4 col-lg-2 col-xl-2">     
            <div className={isSel?"card bg-primary":"card"} onClick={sendStakehId}>        
                <div className="text-center">
                     <img src={require('../../img/StakeType/'+typeName+'.svg')} alt={typeName} className="img-card mt-4"/>
                </div>
                <div className="card-body">                  
                    <hr className={isSel?"mt-0 bg-light":"mt-0"} />
                    <p className={isSel?"card-title mb-1 font-weight-bold text-truncate text-light":"card-title mb-1 font-weight-bold text-truncate text-muted"}>{decodeURIComponent(name)}</p>
                    <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../../img/gear.svg')}/>Type: {decodeURIComponent(typeName)}</small></p>
                    {/* <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/email.svg')} alt="email"/>Email: {decodeURIComponent(stakehId)}</small></p>
                    <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/telephone.svg')} alt="email"/>Telephone Number: {decodeURIComponent(stakehId)}</small></p>                     */}
                </div>
            </div> 
        </div>
        
         
  )
}


