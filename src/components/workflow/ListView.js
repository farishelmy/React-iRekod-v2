import React from 'react'

export default function DetailCard({title, markOnSel,taskId, isSel , subject}) {
    const handleClick=(e)=>{
        markOnSel(taskId, subject)
    }
  return (
    <div className="col-12">
    <div className={isSel?"card mb-3 bg-primary":"card mb-3"} onClick={handleClick} >
        <div className="p-2 d-flex justify-content-between align-items-center">
            <img className="p-2 img-fluid img-scale" src={require('../../img/management.svg')} alt="activity"/>
        <div className="mr-auto p-2">
            <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{decodeURIComponent(title)}</p>
        </div>
        </div>
    </div>
    </div>
  )
}
