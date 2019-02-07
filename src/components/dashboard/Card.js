import React from 'react'  
import posed from 'react-pose'

export default function Card({setActivePage,setPageTitle,setStakehNumb}) {
  const page=(e)=>{
    e.preventDefault()
    // setActivePage(e.target.getAttribute('data-pagename'))
    console.log(e.target.getAttribute('data-pagetitle'))
    // setPageTitle(e.target.getAttribute('data-pagetitle'))
    // setStakehNumb(e.target.getAttribute('id')) 
}
   
  const Card = posed.div({
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
    <div>
    <section className="statistics mt-4">
        <div className="container-fluid">
        <div className="row d-flex">
        
        <div className="col-lg-4 col-md-4 col-sm-4">   
        <Card>   
            <div className="card data-usage" onClick={page} data-pagename='index' data-pagetitle='Group' data-id='0'>             
                <h2 className="display h4 ">Group</h2>                
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">                                                            
                        <img src={require('../../img/StakeType/Group.svg')} alt="group" className="card-img-top img-fluid" />                                      
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">7</strong><span></span></div>
                </div>            
            </div>
            </Card>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">   
        <Card> 
            <div className="card data-usage"  >
                <h2 className="display h4">Organization</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">                                                            
                        <img src={require('../../img/StakeType/Organization.svg')} alt="Organization" className="card-img-top img-fluid" onClick={page} data-pagename='index' data-pagetitle="Organization" data-id="1"/>                                    
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">21</strong><span></span></div>
                </div>
            </div>
            </Card>  
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4"> 
        <Card>    
            <div className="card data-usage">
                <h2 className="display h4">Branch</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Branch.svg')} alt="Branch" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Branch"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">5</strong><span></span></div>
                </div>

            </div>
            </Card> 
        </div>



        </div>
        </div>
    </section>

    <section className="statistics mt-4">
        <div className="container-fluid">
        <div className="row d-flex">

                
        <div className="col-lg-4 col-md-4 col-sm-4">  
        <Card>     
            <div className="card data-usage">
                <h2 className="display h4">Department</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Department.svg')} alt="Department" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Department"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">7</strong><span></span></div>
                </div>

            </div>
            </Card>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">   
        <Card>    
            <div className="card data-usage">
                <h2 className="display h4">Designation</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">                                                            
                        <img src={require('../../img/StakeType/Designation.svg')} alt="Designation" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Designation"/>                                      
                   </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">4</strong><span></span></div>
                </div>

            </div>
            </Card> 
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">   
        <Card>    
            <div className="card data-usage">
                <h2 className="display h4">User</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">                                                            
                        <img src={require('../../img/StakeType/User.svg')} alt="User" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="User"/>                                      
                    </div>                  
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">12</strong><span></span></div>
                </div>

            </div>
            </Card>            
        </div>
                
        </div>
        </div>
    </section>
 
 

    </div>
        
         
  )
}


