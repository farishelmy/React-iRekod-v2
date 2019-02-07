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

    <div className="col-3 colContainer">
        <div className={active==='basic'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="basic"
                src={require('../../../img/StakeType/Group.svg')}
                // className='img-fluid'
                className={active==='basic'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive}/>
        </div>
    </div>

   <div className={isContainer?"col-3 colContainer":"d-none"}>
        <div className={active==='security'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */} 
            <img
                name="security"
                src={require('../../../img/StakeType/Group.svg')}
                className={active==='security'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>   

</div>
)}
export default FolderTabHeader

