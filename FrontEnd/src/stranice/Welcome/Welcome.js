import React from 'react'
import './Welcome.css'
import {useHistory} from 'react-router-dom'

export default function Welcome() {
   
    const history =useHistory();
  
  const handleHistory1=()=>
  {
    history.push("/")
  }
  const handleHistory2=()=>
  {
    history.push("/prijaviSe")
  }
  
    return (

        <div >
            <div className='welcomeCont'>
                <div className='pomCont'>
            <h2 className='naslovCont'>Uspešno ste se registrovali!<i className="far fa-check-circle ikonica"></i></h2>
           <div className='divZaDugmice'>
            <button className='dugm' onClick={handleHistory1}>Vrati se na početnu stranu</button>
            <button className='dugm' onClick={handleHistory2}>Prijavi se na sajt</button>
            </div>

            </div>
            </div>
           
         
            
        </div>
    )
}
