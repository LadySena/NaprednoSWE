import React,{useState,useEffect} from 'react'
import './Profil.css'
import {Button,Modal, Row,Table,Alert} from 'react-bootstrap'
import LoadingSpin from '../../komponente/LoadingSpin'
import axios from 'axios'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import {useHistory} from "react-router-dom"
 

function Profil(){
  const history=useHistory()
  const handleHistory=()=>
  {
    history.push("/Casovi")
  }
   const [ime,setIme]=useState("")
   
   const [prezime,setPrezime]=useState("")
   const [godine,setGodine]=useState("")
   const [telefon,setTelefon]=useState("")
   const [email,setEmail]=useState("")
   const [tip,setTip]=useState("")
   const [korisnickoIme,setKorisnickoIme]=useState("")
   const [modal,setModal]=useState(false) 
   const [spin,setSpin]=useState(false)
   const [casovi,setCasove]=useState({pod:[]})
   const [termini,setTermini]=useState({pod:[]})
   const [terminiClana,setTerminiClana]=useState({pod:[]})
   const [profilnaIme,setProfilnaIme]=useState("")
   const [profilnaSrc,setProfilnaSrc]=useState('/slike/profil.jpg')
   const [profilnaFile,setProfilnaFile]=useState(null)
   const [prikazClan,setPrikazClan]=useState(false)
   const [prikazInstruktor,setPrikazInstruktora]=useState(false)
   const [prikazFormeZaIzborSlike,setPrikazFormeZaIzborSlike]=useState(false)
   const [prikazDugmetaIzmeniSliku,setPrikazDugmetaIzmeniSliku]=useState(true)
   const [maksBrojOsoba,setMaksBrojOsoba]=useState("")
   const [godineIzmena,setGodineIzmena]=useState("")
   const [telefonIzmena,setTelefonIzmena]=useState("")
   const [emailIzmena,setEmailIzmena]=useState("")
  const [terminiClan,setTerminiClan]=useState({pod:[]})
   const [idIzmenaCasa,setIdIzmenaCasa]=useState("")
   const[imeCasa,setImeCasa]=useState("")
  const [modalZakaziCas,setModalZakaziCas]=useState(false)
  const [datum,setDatum]=useState(new Date())
  const [modalUspesnoZakazanTermin,setModalUspesnoZakazanTermin]=useState(false)
  const [modalZakazanTerminGreska,setModalZakazanTerminGreska]=useState(false)
  const [modalTermini,setModalTermini]=useState(false)
  const [modalPotvrdiOtkazivanje,setModalPotvrdiOtkazivanje]=useState(false)
  const[vremePocetak,setVremePocetak]=useState('10:00')
  const[vremeKraj,setVremeKraj]=useState('10:00')
  const [idTerminaOtkazivanje,setIdTerminaOtkazivanje]=useState("")
  const [modalUspesnoOtkazivanje,setModalUspesnoOtkazivanje]=useState(false)
  const [modalOtkazivanjeGreska,setModalOtkazivanjeGreska]=useState(false)
  const [probniTermin,setProbniTermin]=useState("")
  const options = {
    year: "2-digit",
    month:"2-digit",
    day:"2-digit"
    }
 
   const dodajTermin=()=>{
     
     let idCasa=casovi.pod.filter(p=>p.naziv==imeCasa).map(tr=>tr.id).toString()
     console.log(casovi)
     setSpin(true)
     setModalZakaziCas(false)
     fetch("https://localhost:5001/SkolaKlizanja/KreirajNoviTermin/"+idCasa,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(
        {
          nazivCasa:imeCasa.toString(),
          korisnickoImeInstruktora:korisnickoIme,
          imeInstruktora:ime,
          prezimeInstruktora:prezime,
          datum:datum.toLocaleDateString("en-US",options),
          vremePocetka:vremePocetak.toString(),
          vremeKraja:vremeKraj.toString(),
          trenutnoOsoba:0,
          maxOsoba:maksBrojOsoba
          
        }
      )
    }).then(p=>{
      setSpin(false)
      if(p.ok)
      {
        setModalUspesnoZakazanTermin(true)
      }
      else
      {
        setModalZakazanTerminGreska(true)
        
      }
    })
   }
   
   
   const prikaziTermine=(id)=>{
    setSpin(true)
    
    let nazivCasa= casovi.pod.filter(p=>p.id===id).map(p=>p.naziv).toString()
    
   fetch("https://localhost:5001/SkolaKlizanja/PreuzmiTermine/").then(pod=>{
       pod.json().then(term=>{
          setSpin(false)
          term = term.filter(x => x.nazivCasa == nazivCasa)
          setTermini({pod:term})
        })
   })
   setModalTermini(true)
}
  
     
  useEffect(() => {
     
    const token=localStorage.getItem("jwt")
           
            fetch("https://localhost:5001/SkolaKlizanja/PreuzmiClana", {
                headers:{'Content-Type':'application/json',
                'Authorization':token},
                credentials:'include',
            }).then(korisnik=>{
    
               korisnik.json().then(podaci=>{
                  
                  localStorage.setItem("tip",podaci.tip)
                  
                   setIme(podaci.ime)
                   setPrezime(podaci.prezime)
                   setGodine(podaci.godine)
                   setTelefon(podaci.telefon)
                   setEmail(podaci.email)
                   setEmailIzmena(podaci.email)
                   setTelefonIzmena(podaci.telefon)
                   setGodineIzmena(podaci.godine)
                   setKorisnickoIme(podaci.korisnickoIme)
                   
                   setTip(podaci.tip)
              
                   localStorage.setItem("ID",podaci.id)
                   if(podaci.slika!=null)
                   {
                    setProfilnaSrc(podaci.slika)
                   }               
          
                   if(localStorage.getItem("tip")==2)
                   {
                     
                     
                     setPrikazClan(true)
                     setProbniTermin(podaci.probniTermin)
                     
                     
                  fetch("https://localhost:5001/SkolaKlizanja/PreuzmiTermineClana/"+localStorage.getItem("ID")).then(pod=>{
                   if(pod.ok)
                   {  
                   pod.json().then(termini=>{
                      
                         setTerminiClan({pod:termini})
                         
                       })
                    }
                  })
                  

                   }
                   else if(localStorage.getItem("tip")==1)
                   {
                    
                     fetch("https://localhost:5001/SkolaKlizanja/PreuzmiCasoveInstruktora/"+localStorage.getItem("ID")).then(p=>{
                       if(p.ok)
                       {
                         p.json().then(cas=>{
                          
                           setCasove({pod:cas})
                           setPrikazInstruktora(true)
                           
                         })
                       }
                     })
                                   
                   }       
               })
          })
        
   
  },[])
  const otkaziTerminKorisnik=(id)=>{
    setSpin(true)
    setModalPotvrdiOtkazivanje(false)
    fetch("https://localhost:5001/SkolaKlizanja/OtkaziTermin/"+localStorage.getItem("ID")+"/"+idTerminaOtkazivanje,{
      method:"DELETE",
      headers:{'Content-Type':'application/json'},
      credentials:'include'
  }).then(p=>{
      setSpin(false)
      if(p.ok)
         {
          setModalUspesnoOtkazivanje(true)
         window.location.reload()
         }
         else
         {
             setModalOtkazivanjeGreska(true)
         }
  })

  }
  const otkaziTerminInstruktor=(id)=>{
    setSpin(true)
    setModalPotvrdiOtkazivanje(false)
    console.log(idTerminaOtkazivanje)
    fetch("https://localhost:5001/SkolaKlizanja/ObrisiTermin/"+idTerminaOtkazivanje,{
      method:"DELETE",
      headers:{'Content-Type':'application/json'},
      credentials:'include'
  }).then(p=>{
      setSpin(false)
      if(p.ok)
         {
          setModalUspesnoOtkazivanje(true)
             setModalTermini(false)
         }
         else
         {
             setModalOtkazivanjeGreska(true)
         }
      
  })
 }
  const potvrdiOtkazivanje=(id)=>{
    setIdTerminaOtkazivanje(id)
    setModalPotvrdiOtkazivanje(true)
  }
  
    
  const izmeni=(e)=>{
      setModal(false) 
      setSpin(true)
      console.log(tip)
      if(tip==2)
      {

          
        fetch("https://localhost:5001/SkolaKlizanja/IzmeniClana/"+localStorage.getItem("ID"),{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(
              {
               
                ime:ime,
                prezime:prezime,
                godine:godineIzmena,
                email:emailIzmena,
                telefon:telefonIzmena,
                
              }
            )
          }).then(p=>{
            setSpin(false)
              if(p.ok)
              {
                  
                  window.location.reload()
                  
              }
          })
      }
      else if(tip==1)
      {
        fetch("https://localhost:5001/SkolaKlizanja/IzmeniInstruktora/"+localStorage.getItem("ID"),{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(
              {
               
                ime:ime,
                prezime:prezime,
                godine:godineIzmena,
                email:email,
                telefon:telefonIzmena
               
              }
            )
          }).then(p=>{
            setSpin(false)
            if(p.ok)
            {
                window.location.reload()
            }
        })

      }
      
    
  }
 
   const izmeniSliku=(e)=>{
     if(e.target.files && e.target.files[0])
     {
       let imgFile=e.target.files[0]
       const reader= new FileReader()
       reader.onload=x=>{
         
         setProfilnaSrc(x.target.result)
       }
       reader.readAsDataURL(imgFile)
       setProfilnaFile(imgFile)
       setProfilnaIme(imgFile.name)
     }

   }
   const izmeniTrajnoSliku=()=>{

    const formData=new FormData()
    formData.append("profilnaFile",profilnaFile)
    
    setSpin(true)
 
      axios.put("https://localhost:5001/SkolaKlizanja/IzmeniSliku/"+korisnickoIme,formData).then(p=>{
        if(p!=null)
        {
          setSpin(false)
        
         setPrikazDugmetaIzmeniSliku(true)
         setPrikazFormeZaIzborSlike(false) 
        }
      })
        

   }
   const podaciZaIzmenuCasova=()=>{
    
     setModalZakaziCas(true)
   }
   const izmeniDatum=datum=>{
     setDatum(datum)
   }
   

    return(
        <div className='glavniDivProfil'>
          <div className='pomocniDivProfilll'>         
             <div className='pomocniDivProfil'>
           <img className='profilnaSlika' src={profilnaSrc} alt='profilna'/>
        {prikazFormeZaIzborSlike? 
           <input type='file'
         placeholder='Izaberi sliku'
         id='profilnaSlika'
          className='form-control-file chooseFile' onChange={izmeniSliku}/>:null}
          {prikazFormeZaIzborSlike?<Button className='btn btn-info btnIzmeniSliku'
          onClick={()=> izmeniTrajnoSliku()}>Sacuvaj izmenu</Button>:null}
          {prikazDugmetaIzmeniSliku? <Button className='btn btn-info btnIzmeniSliku' 
          onClick={()=>{setPrikazFormeZaIzborSlike(true) ;setPrikazDugmetaIzmeniSliku(false)}}>Izmeni sliku</Button>:null}
           <label>Ime: <label className='pomInfo'>{ime}</label></label>
           <label>Prezime: <label className='pomInfo'>{prezime}</label></label>
           <label>Godine: <label className='pomInfo'>{godine}</label> </label>
           <label>Broj telefona: <label className='pomInfo'>{telefon}</label> </label>
           <label>Email: <label className='pomInfo'>{email}</label></label>
          {godine==0 || telefon==null? <label style={{color:'purple'}}>Molimo Vas da unesete sve podatke o sebi.</label>:null } 
          
           <Button className='btn btn-success dugmIzmeni' onClick={()=>setModal(true)}>Izmeni podatke</Button>
          
           {spin?<LoadingSpin/>:null}
           
         


        </div>
    {prikazClan? <div className='divInstruktor'>
       
      <label className='naslovEvidencija' style={{marginTop:"50px"}}>Vaši zakazani termini</label>
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <td>Naziv casa</td>
                  <td>Datum</td>
                  <td>Početak</td>
                  <td>Kraj</td>
                  <td>Ime instruktora</td>
                  <td>Prezime instruktora</td>
                </tr>
              </thead>
        <tbody>
        { 
        terminiClan.pod.filter(obj=>obj!=null).map((termin)=>(
          
          <tr key={termin.id}>
            
            <td>{termin.nazivCasa}</td>
            <td>{termin.datum}</td>
            <td>{termin.vremePocetka}</td>
            <td>{termin.vremeKraja}</td>
            <td>{termin.imeInstruktora}</td>
            <td>{termin.prezimeInstruktora}</td>
            <td><Button variant='danger' onClick={()=>potvrdiOtkazivanje(termin.id)} >Otkaži termin</Button></td>
          
          </tr>

        ))
          }
        
        </tbody>
      </Table>
      {probniTermin==true?<Button onClick={handleHistory}>Zakaži besplatni termin</Button>:<Button className='zakazi' onClick={handleHistory}>Zakaži novi termin</Button>} 
      

    </div>:null}





    {prikazInstruktor? <div className='divInstruktor'>
       <label className='naslovEvidencija'>Vaši časovi</label>
       
        <Table striped bordered hover size="sm">
     <tbody>
     {casovi.pod.filter(cas=>cas!=null).map((cas)=>(
      <tr key={cas.id}>
      <td>{cas.naziv}</td>
      <td><Button onClick={()=>{
        podaciZaIzmenuCasova();
        setImeCasa(cas.naziv)}}>
          Zakaži novi termin</Button></td>
      <td><Button  onClick={()=>prikaziTermine(cas.id)}>Prikazi termine</Button></td>
    </tr>
    )
  )}
    
  </tbody>
</Table>
        </div>:null}

     
        </div>
       
        <Modal show={modalUspesnoZakazanTermin}>
              <Modal.Header >Uspešno zakazivanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste zakazali novi termin<i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalUspesnoZakazanTermin(false)}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalZakazanTerminGreska}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je, došlo je do greške prilikom zakazivanja termina.Molimo Vas pokušajte ponovo.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalZakazanTerminGreska(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={modalPotvrdiOtkazivanje}>
              
              <Modal.Body>
              <Alert className='alert alert-info'>Da li ste sigurni da želite da otkažete ovaj termin?</Alert>
             </Modal.Body>
              <Modal.Footer>
               { localStorage.getItem("tip")=='2'?<Button onClick={otkaziTerminKorisnik}  >Potvrdi</Button>:null}
               { localStorage.getItem("tip")=='1'?<Button onClick={otkaziTerminInstruktor}  >Potvrdi</Button>:null}
                  <Button onClick={()=>setModalPotvrdiOtkazivanje(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalTermini}>
        
          <Modal.Header>Termini</Modal.Header> 
              <Modal.Body>
                  {
                   termini.pod.map((termin)=>(
                        <div key={termin.id} className='divModal'>
                          

                            <Row>Datum: {termin.datum}</Row>
                            <Row>Vreme pocetka: {termin.vremePocetka} </Row>
                            <Row>Vreme kraja: {termin.vremeKraja}</Row>
                           
                         
                           {termin.nazivCasa== 'Personalni trening' ? null : <Row>Trenutni broj ljudi: {termin.trenutnoOsoba}</Row>} 
                          
                           {termin.nazivCasa== 'Personalni trening' ? null : <Row>Maksimalni broj ljudi: {termin.maxOsoba} </Row>}
                            <Row><Button className='btn-danger' onClick={()=>potvrdiOtkazivanje(termin.id)}>Otkaži</Button></Row>

                        </div>
                    ))
                  }
              
             </Modal.Body>
             <Modal.Footer>
                  <Button onClick={()=>setModalTermini(false) }>Ok</Button>
              </Modal.Footer>
             </Modal>
             <Modal show={modalUspesnoOtkazivanje}>
              <Modal.Header >Uspešno brisanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste otkazali ovaj termin<i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalUspesnoOtkazivanje(false)}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalOtkazivanjeGreska}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je, došlo je do greške prilikom otkazivanja termina.Molimo Vas pokušajte ponovo.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalOtkazivanjeGreska(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={modal}>
               <Modal.Header >Izmenite podatke o sebi</Modal.Header>
               <Modal.Body>
               <Row>Ime: <input className='unosIzmena' defaultValue={ime} disabled /></Row>
               <Row>Prezime: <input className='unosIzmena' defaultValue={prezime} disabled /></Row>
               <Row>Godine: <input className='unosIzmena' defaultValue={godine}  onChange={e=>setGodineIzmena(e.target.value)}/></Row>
               <Row>Broj telefona: <input className='unosIzmena' defaultValue={telefon}  onChange={e=>setTelefonIzmena(e.target.value)}/></Row>
               <Row>Email: <input className='unosIzmena' defaultValue={email}  onChange={e=>setEmailIzmena(e.target.value)}/></Row>
               </Modal.Body>
               <Modal.Footer>
                   <Button onClick={izmeni}>Potvrdi</Button>
                   <Button onClick={()=>setModal(false)}>Poništi</Button>
               </Modal.Footer>
           </Modal>
           <Modal show={modalZakaziCas}>
               <Modal.Header >Zakaži novi termin</Modal.Header>
               <Modal.Body>
               <Row className='redZakazi'>Naziv casa: <h5 style={{color:"blue"}}>{imeCasa}</h5></Row>
              <Row>Datum:</Row>
              <Row>
              <DatePicker
               closeOnScroll={true}
               selected={datum}
               onChange={(date) => setDatum(date)}
                />
               </Row>
              

               <Row>Od:</Row> 
               <Row>     
                <TimePicker
                 onChange={(vreme)=>setVremePocetak(vreme)}
                value={vremePocetak}
                timeIntervals={30}
                 />
                </Row>
                 
                 <Row>Do:</Row>
                 <Row>
                   <TimePicker
                 onChange={(vreme)=>setVremeKraj(vreme)}
                 value={vremeKraj}
                 timeIntervals={30}
                  />
                 </Row>
                
                 <Row>Maksimalni broj osoba:</Row>
                 <Row>
                   <input type='number' onChange={e=>setMaksBrojOsoba(e.target.value)}></input>
                 </Row>

               </Modal.Body>
               <Modal.Footer>
                   <Button onClick={()=>dodajTermin()}>Potvrdi</Button>
                   <Button onClick={()=>setModalZakaziCas(false)}>Poništi</Button>
               </Modal.Footer>
           </Modal>
          
           



          
          
           

  

        </div>
    )
}
export default Profil