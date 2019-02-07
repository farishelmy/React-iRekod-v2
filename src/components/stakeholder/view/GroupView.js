import React from 'react'

export default function GroupView({stkhId,fullName,typeName,setActivePage,stakehType}) {

  const pageBtn=(e)=>{
    e.preventDefault()
    setActivePage(stkhId,stakehType)
     // console.log(e.target.getAttribute('data-id'))
    // console.log(e.target.data-pagename, e.target.id)
  }

  return (     
      <div id={stkhId} name={fullName} className="mt-2">
            <div className={"col-lg-12 col-md-12 col-sm-12 "} >
                <img src={require('../../../img/StakeType/'+ typeName +'.svg')} alt="person" className="img-list mx-auto d-block" />              
                <p className={"card-title text-truncate ml-2 mb-2 btn btn-link"} data-id={stkhId} onClick={pageBtn}>{decodeURIComponent(fullName)}</p>                                        
            </div>
        </div>     
  )
}
