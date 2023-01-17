import React from 'react'
import About from './About'
import './About.css'
import { Slider } from './Slider'
import imgIceSkater from './slikica2.png'
import "bootstrap/dist/css/bootstrap.min.css"
export default function oNama() {
    return (
        <div className="pozadina" >
              <h3 className='onama'color="black"> O nama</h3>
              <div className='imgIce'>
                <img src={imgIceSkater} alt="" />
              </div>
              <div className="divText">  
              <div className="jumbotron bg-transparent" > 
                Moderno opremljen ambijent i pozitivna atmosfera pruža Vam mogućnost da se opustite!
                <br></br>
                Dodjite i uverite se u naš kvalitet!
                <br></br>
                "Ice Magic" je sa Vama od 2000.godine u Nišu.
                <br></br>
                Uz instruktore sa dugogodišnjim iskustvom,"Ice Magic" predstavlja školu koja garantuje zabavu svim generacijama!
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br> <i className="fa fa-phone "></i>
                Kontakt telefon: 067-123-2333

                <br></br>
                <br></br> <i className="far fa-clock "></i>
                Radno vreme: 09:00-22:00

                <br></br>
                <br></br> <i className="fa fa-map-marker "></i>
                Adresa: Bulevar Zorana Djindjića, Niš
              </div>

              <div className='nesto'>
              <About slides={Slider}/>

              </div>
              </div>
             
              
              
        </div>
    )
}
