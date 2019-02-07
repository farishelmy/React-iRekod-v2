import React from 'react'


// const FolderTabHeader =({getActive, active, recordDetails:{access},iconType})=>{
    const FolderTabHeader =({activeEditor,active,isContainer})=>{
        // const canDelete = access===null||!access.can_delete?false:true
        // console.log(object)
        const sendActive=(e)=>{
            e.preventDefault()
            activeEditor(e.target.name)
    }
   return (
    <div className="row colWrap justify-content-center">
    {/* <div className={iconType?"col-3 colContainer":"col-3 colContainer hideLine"}> */}
    {/* <div className="col-3 colContainer hideLine"> */}

    <div className="col-2 colContainer">
        <div className={active==='basic'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="basic"
                src={require('../../../img/information.svg')}
                // className='img-fluid'
                className={active==='basic'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive}/>
        </div>
    </div>

   <div className={isContainer?"col-2 colContainer":"d-none"}>
        <div className={active==='security'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */} 
            <img
                name="security"
                src={require('../../../img/padlock.svg')}
                className={active==='security'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>

    <div className={isContainer?"col-2 colContainer":"col-3 colContainer hideLine"}>
        <div className={active==='access'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="access"
                src={require('../../../img/access.svg')}
                className={active==='access'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div> 

    <div className={isContainer?"col-2 colContainer":"d-none"}>
        <div className={active==='group'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="group"
                src={require('../../../img/share.svg')}
                className={active==='group'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div> 

    <div className={isContainer?"col-2 colContainer":"d-none"}>
        <div className={active==='delete'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="delete"
                src={require('../../../img/fab-trash.svg')}
                className={active==='delete'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>

</div>
)}
export default FolderTabHeader

