import React/*,{useState,useEffect}*/ from 'react'
import { Button } from '../../komponente/Button'
import './Pocetna.css'
import {useHistory} from "react-router-dom"



function Pocetna() {
   const history=useHistory()
   const handleHistory1=()=>
  {
    history.push("/oNama")
  }
  const handleHistory2=()=>
  {
    history.push("/prijaviSe")
  }
  const handleHistory3=()=>
  {
    history.push("/registrujSe")
  }
    
    return (
        <div className='pocetna-container'>
           
           <h1 className="Naslov">Ice magic</h1>
           <p>Stvarajmo magiju zajedno!</p>
           
           
            <div className="pocetna-Dugmici">
            
                <Button
                className='btns hover-zoom'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                onClick={handleHistory1} 
                >
                 Upoznaj nas
                </Button>
                <Button
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                onClick={handleHistory2}
                >
                 Prijavi se
                </Button>
                <Button
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                onClick={handleHistory3}>
                    Pridruži se          
               </Button>
               
                
            </div>
            
            
        </div>
      )
    
}

export default Pocetna
