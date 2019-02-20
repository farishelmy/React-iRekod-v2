import React from 'react'


const NewFolderTabHeader =({activeEditor,active,isContainer})=>{
    
        const sendActive=(e)=>{
            e.preventDefault()
            activeEditor(e.target.name)
            // console.log(e.target.name)
            // console.log(activeEditor)
        }

    return (
      
<div className="row colWrap justify-content-center">

    <div className="col-3 colContainer">
    <div className={active==='newActivityWizard'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
            name="newActivityWizard"
            src={require('../../../img/tasks.svg')} alt="activityImage"
            className={active==='newActivityWizard'?'img-fluid desaturate':'img-fluid'}
            onClick={sendActive} />
        </div>
    </div>

    <div className={isContainer?"col-3 colContainer":"d-none"}>
   <div className={active==='newEmail'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
                name="newEmail"
                src={require('../../../img/mail.svg')} alt="emailImage"
                className={active==='newEmail'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div>

   <div className={isContainer?"col-3 colContainer":"d-none"}>
    <div className={active==='newAutoscript'?'tab activeTab mx-auto':'tab mx-auto'}>
                <img
                name="newAutoscript"
                src={require('../../../img/browser.svg')} alt="autoscriptImage"
                className={active==='newAutoscript'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div> 

</div>

    )}


export default NewFolderTabHeader