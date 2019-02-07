import React from 'react'
import posed from 'react-pose'
 

export default function DetailCard({stakehId,name,typeName,isSel,markOnSel,email}) {
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
    <div className="col-12">
    
        <div className={isSel?"card mb-3 bg-primary":"card mb-3"} onClick={sendStakehId}>
            <div className="p-2 d-flex justify-content-between align-items-center">
                <img src={require('../../img/StakeType/'+typeName+'.svg')} alt={typeName} className="p-2 img-fluid img-scale" />
                    <div className="mr-auto p-2">                     
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{decodeURIComponent(name)}</p>
                        <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../../img/gear.svg')}/>Type: {decodeURIComponent(typeName)}</small></p>
                        {/* <p className="card-text"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/email.svg')} alt="email"/>Email: {decodeURIComponent(email)}</small></p>
                        <p className="card-text"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/telephone.svg')} alt="email"/>Telephone Number: {decodeURIComponent(email)}</small></p> */}
                         
                    </div>
            </div>
        </div>
        
    </div>
)
}