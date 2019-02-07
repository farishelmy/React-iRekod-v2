import React from 'react'

export default function MemberView({stkhId,fullName,typeName,setActivePage,stakehType}) {

  const pageBtn=(e)=>{
    e.preventDefault()
    setActivePage(stkhId,stakehType)    
    // console.log(e.target.getAttribute('data-id'))
  }

  return (
    <div>
       <div id={stkhId} name={fullName} className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2">
            <div className="d-flex justify-content-start align-items-center" >
                <img src={require('../../../img/StakeType/'+ typeName +'.svg')} alt="person" className="img-list" />              
                <p className="ml-1 text-truncate btn btn-link" data-id={stkhId} onClick={pageBtn} >{decodeURIComponent(fullName)}</p>                                        
            </div>
        </div>   
    </div>
  )
}
