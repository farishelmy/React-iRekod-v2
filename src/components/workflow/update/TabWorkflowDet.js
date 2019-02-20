import React from 'react'


const FolderTabHeader =({activeEditor,active,isContainer})=>{
    
        const sendActive=(e)=>{
            e.preventDefault()
            activeEditor(e.target.name)
        }

    return (
      
<div className="row colWrap justify-content-center">

    <div className="col-3 colContainer">
    <div className={active==='activity'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
            name="activity"
            src={require('../../../img/tasks.svg')} alt="activityImage"
            className={active==='activity'?'img-fluid desaturate':'img-fluid'}
            onClick={sendActive} />
        </div>
    </div>

    <div className={isContainer?"col-3 colContainer":"col-3 colContainer hideLine"}>
   <div className={active==='email'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
                name="email"
                src={require('../../../img/mail.svg')} alt="emailImage"
                className={active==='email'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div>

   <div className={isContainer?"col-3 colContainer":"d-none"}>
    <div className={active==='autoscript'?'tab activeTab mx-auto':'tab mx-auto'}>
                <img
                name="autoscript"
                src={require('../../../img/browser.svg')} alt="autoscriptImage"
                className={active==='autoscript'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div> 

</div>

    )}


export default FolderTabHeader