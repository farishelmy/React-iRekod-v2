import React from 'react'


const FolderTabHeader =({activeEditor,active,isContainer})=>{
    
        const sendActive=(e)=>{
            e.preventDefault()
            activeEditor(e.target.name)
        }

    return (
      
<div className="row colWrap justify-content-center">

    <div className="col-3 colContainer">
    <div className={active==='general'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
            name="general"
            src={require('../../../img/tasks.svg')} alt="general"
            className={active==='general'?'img-fluid desaturate':'img-fluid'}
            onClick={sendActive} />
        </div>
    </div>

    {/* <div className={isContainer?"col-3 colContainer":"col-3 colContainer hideLine"}>
   <div className={active==='activity'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
                name="activity"
                src={require('../../../img/mail.svg')} alt="activity"
                className={active==='activity'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div> */}

   <div className={isContainer?"col-3 colContainer":"d-none"}>
    <div className={active==='record'?'tab activeTab mx-auto':'tab mx-auto'}>
                <img
                name="record"
                src={require('../../../img/browser.svg')} alt="record"
                className={active==='record'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div> 

</div>

    )}


export default FolderTabHeader