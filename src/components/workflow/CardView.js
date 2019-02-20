import React from 'react'
import posed from 'react-pose'

export default function Workflow({title, markOnSel,taskId, isSel, subject}) {
    
    const handleClick=(e)=>{
        markOnSel(taskId, subject)
    }

    const Box = posed.div({
        hoverable: true,
        pressable: false,
        init: {
          scale: 1,
          boxShadow: '0px 0px 0px rgba(0,0,0,0)'
        },
        hover: {
          scale: 1.2,
          boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
        },
        press: {
          scale: 1.2,
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
        }
      });

      

    return (
        <div className="col-6 col-md-4 col-lg-2 col-xl-2">
        
           <div className={isSel?"card bg-primary":"card"} onClick={handleClick} >
               <div className="text-center">
                    <img className="img-card mt-4" src={require('../../img/management.svg')} alt="activity"/>
               </div>
               <div className="card-body">                  
                   <hr className={isSel?"mt-0 bg-light":"mt-0"} />
                   <p className={isSel?"card-title mb-1 font-weight-bold text-truncate text-light":"card-title mb-1 font-weight-bold text-truncate text-muted"}>{decodeURIComponent(title)}</p>
               </div>
           </div>
           
       </div>


         
    
  )
}
