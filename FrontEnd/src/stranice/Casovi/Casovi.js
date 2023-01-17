import React,{useState,useEffect,useMemo} from 'react'
import PaginationComponent from '../../komponente/PaginationComponent'
import {Table,Button,Modal,Alert,Row} from 'react-bootstrap'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-datepicker'
import LoadingSpin from '../../komponente/LoadingSpin'
import Search from '../../komponente/Search'
import './Casovi.css'
export default function Casovi() {
    const [podaci,setPodaci]=useState({pod:[]})
    const [instruktori,setInstruktori]=useState({pod:[]})
    const [termini,setTermini]=useState({pod:[]})
    const [spin,setSpin]=useState(false)


    const [ukupnoStavki,setUkupnoStavki]=useState(0)
    const [trStranica,setTrStranica]=useState(1)
    const [pretrazi,setPretrazi] =useState("")
    const STAVKE_PO_STRANICI=5
    const [modalUspesnoBrisanje,setModalUspesnoBrisanje]=useState(false)
    const [modalBrisanjeGreska,setModalBrisanjeGreska]=useState(false)
    const [modalObrisi,setModalObrisi]=useState(false)
    const [modalUspesnoZakazivanjeClan,setModalUspesnoZakazivanjeClan]=useState(false)
    const [modalZakazivanjeGreskaBroj,setModalZakazivanjeGreskaBroj]=useState(false)
    const [modalZakazivanjeGreskaCl,setModalZakazivanjeGreskaCl]=useState(false)
    const [idBrisanje,setIdBrisanje]=useState("")
    const [modalDodajCas,setModalDodajCas]=useState(false)
    const [naziv,setNaziv]= useState("")
    const [cena,setCena] =useState("")
    const [prikazClan,setPrikazClan]=useState(false)
    const [validacijaNaziv,setValidacijaNaziv]=useState(false)
    const [validacijaCena,setValidacijaCena]=useState(false) 
    const [modalUspesnoDodavanje,setModalUspesnoDodavanje]=useState(false)
    const [modalDodavanjeGreska,setModalDodavanjeGreska] =useState(false)
    const [idIzmena,setIdIzmena]=useState("") 
    const [prikazInstruktor, setPrikazInstruktor]=useState(false)
    const [modalInstruktori,setModalInstruktori]=useState(false)
    const [modalTermini,setModalTermini]=useState(false)
    
    
    useEffect(() => {
        
           
        
        fetch("https://localhost:5001/SkolaKLizanja/PreuzmiCasove").then(pod=>{
            pod.json().then(treninzi=>{
               
                setPodaci({pod:treninzi})
                setUkupnoStavki(podaci.pod.length)
                let tip=localStorage.getItem("tip")
                if(tip==1)
                {
                    setPrikazInstruktor(true)
                }
             })
        })
       
        if(localStorage.getItem("tip")==2)
        {
            setPrikazClan(true)
        }
        else
        {
            setPrikazClan(false)
        }
        
     },[])
     const sviCasovi=useMemo(()=>{

        let obv=podaci.pod;
        
        if(pretrazi)
        {
            obv=obv.filter(
                obav=>
                obav.naziv.toLowerCase().includes(pretrazi.toLowerCase()) ||
                obav.tip.toLowerCase().includes(pretrazi.toLowerCase())
            )
        }
        setUkupnoStavki(obv.length)
        return obv.slice((trStranica-1)*STAVKE_PO_STRANICI,(trStranica-1)*STAVKE_PO_STRANICI+STAVKE_PO_STRANICI)
     },[podaci,trStranica,pretrazi])
    
  
  const potvrdiBrisanje=(id)=> {
         
    setModalObrisi(true)
    setIdBrisanje(id)

  }
  const obrisiClana=()=>
     {
         setModalObrisi(false)
         setSpin(true)
         fetch("https://localhost:5001/SkolaKlizanja/ObrisiCas/"+idBrisanje,{
             method:"DELETE",
             headers:{'Content-Type':'application/json'},
             credentials:'include'
         }).then(p=>{
             setSpin(false)
             if(p.ok)
                {
                    setModalUspesnoBrisanje(true)
                }
                else
                {
                   setModalBrisanjeGreska(true)
                }
         })

     }
  const uspesnoBrisanje=()=>{
    setModalUspesnoBrisanje(false)
    window.location.reload()
}
const dodajNoviCas=()=>{
    console.log(naziv,cena)
    if(!naziv)
    {
        setValidacijaNaziv(true)
    }
    
    else if(!cena)
    {
        setValidacijaCena(true)
    }
    
    
    else
    {
        
        setModalDodajCas(false)
        setValidacijaCena(false)
        setValidacijaNaziv(false)
        setSpin(true)
        fetch("https://localhost:5001/SkolaKlizanja/DodajCas",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
              {
                naziv:naziv,
                cena:cena
              }
            )
          }).then(p=>{
            setSpin(false)
              if(p.ok)
              {
                 
                  setModalUspesnoDodavanje(true)
              }
              else
              {
                  setModalDodavanjeGreska(true)

              }
          })

    }
}

const [instruktoriPersonal,setInstruktoriPersonal]=useState({pod:[]})
const prikaziModalZakaziCas=()=>{

    fetch("https://localhost:5001/SkolaKlizanja/PreuzmiInstruktoreCasa/6").then(p=>{
        p.json().then(instruktori=>{
          setInstruktoriPersonal({pod:instruktori})
        })
       
        
    })

    }
   

    const options = {
        year: "2-digit",
        month:"2-digit",
        day:"2-digit"
        }
    
const uspesnoDodavanje=()=>{
    setModalUspesnoDodavanje(false)
    window.location.reload()
}
const [idCasaBrisanje,setIdCasaBrisanje]=useState("")
 const prikaziInstruktore=(id)=>{
     setSpin(true)
     setIdCasaBrisanje(id)
    fetch("https://localhost:5001/SkolaKlizanja/PreuzmiInstruktoreCasa/"+id).then(pod=>{
        pod.json().then(instruktori=>{
           setSpin(false)
           setInstruktori({pod:instruktori})
           setModalInstruktori(true)
           
         })
    })
 }
 const prikaziTermine=(id)=>{
    setSpin(true)
    let naziv= podaci.pod.filter(p=>p.id==id).map(cs=>cs.naziv).toString()
   fetch("https://localhost:5001/SkolaKlizanja/PreuzmiTermine").then(pod=>{
       pod.json().then(termini=>{
          setSpin(false)
          termini = termini.filter(x => x.nazivCasa == naziv)
          setTermini({pod:termini})
          setModalTermini(true)
          console.log(termini)
        })
   })
}
const zakaziTermin=(terminId)=>{
    setSpin(true)
    fetch("https://localhost:5001/SkolaKlizanja/DodajTermineClanova/"+terminId+"/"+localStorage.getItem("ID"),{
        method:"POST",
        headers:{'Content-Type':'application/json'}
   }).then(p=>{
       setSpin(false)
       setModalTermini(false)
       if(p.ok)
       {
           setModalUspesnoZakazivanjeClan(true)

       }
       else if(p.status==451)
       {
           setModalZakazivanjeGreskaCl(true)

       }
       else if(p.status==452)
       {
           setModalZakazivanjeGreskaBroj(true)

       }
   })
}
const uspesnoZakazivanje=()=>{
    setModalUspesnoZakazivanjeClan(false)
       
}
const [modalDodajInstruktoraCasu,setModalDodajInstruktoraCasu]=useState(false)
const dodajInstruktoraCasu=(id)=>{
    fetch("https://localhost:5001/SkolaKlizanja/PreuzmiInstruktore").then(pod=>{
        pod.json().then(instruktori=>{
           setSpin(false)
           setInstruktori({pod:instruktori})
          
           
         })
    })
    setModalDodajInstruktoraCasu(true)
    setIdIzmena(id)
}
const dodajInstruktoraIzabrInstr=(id)=>{
    setSpin(true)
    fetch("https://localhost:5001/SkolaKlizanja/DodajCasoveInstruktora/"+idIzmena+"/"+id,{
        method:"POST",
      headers:{'Content-Type':'application/json'}
    }).then(p=>{
     setSpin(false)   
    if(p.ok)
        {
            setModalDodajInstruktoraCasu(false)


        }
    })

}
  const obrisiInstruktoraSaCasa=(id)=>{
     fetch("https://localhost:5001/SkolaKlizanja/ObrisiCasInstruktora/"+idCasaBrisanje+"/"+id,{
         method:"DELETE"
     }).then(p=>{
         if(p.ok)
         {
             setModalInstruktori(false)
         }
     })
      
  }  

    return (
        <div>
           
            <Search 
             pretrazi={(value)=>{
               setPretrazi(value)
               setTrStranica(1)
           }}/>
            <div className='pomRedDodajCas'>
          <PaginationComponent
            ukupno={ukupnoStavki}
            stavkePoStranici={STAVKE_PO_STRANICI}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
          
          
          {prikazInstruktor ?<Button onClick={()=>setModalDodajCas(true)}>Dodaj novi cas</Button>:null}
           </div>
            
  <Table striped bordered hover >
  <thead>
    <tr>
      <th>ID</th>
      <th>Naziv</th>
      <th>Cena po casu</th>
      
    </tr>
  </thead>
  <tbody>
      {
        sviCasovi.map((cas)=>(
            <tr key={cas.id}>
            <td>{cas.id}</td>
            <td>{cas.naziv}</td>
            <td>{cas.cena}</td>
        <td><Button onClick={()=>prikaziInstruktore(cas.id)}>Prikaži instruktore</Button></td>
        {cas.naziv=='Personalni cas' && localStorage.getItem("tip")=='2'?  <td><Button onClick={()=>prikaziModalZakaziCas()} >Zakazi cas</Button></td>:  <td><Button onClick={()=>prikaziTermine(cas.id)}>Prikaži termine</Button></td>}    
        {prikazInstruktor ?<td><Button onClick={()=>dodajInstruktoraCasu(cas.id)}>Dodaj instruktora</Button></td>:null}
       
        {prikazInstruktor ?<td><Button className='btn btn-danger'  onClick={()=>potvrdiBrisanje(cas.id)}>Obriši</Button></td>:null}
        
          </tr>
          ))
      }
   
  </tbody>
</Table>
        <Modal show={modalInstruktori}>
          <Modal.Header>Instruktori</Modal.Header> 
              <Modal.Body>
                  {
                    instruktori.pod.map((instruktor)=>(
                        <div key={instruktor.id} className='divModal'>
                             <img className='profilnaSlikaInstruktora' src={instruktor.slika} alt='profilna'/>
                            <Row>Ime: {instruktor.ime} </Row>
                            <Row>Prezime: {instruktor.prezime} </Row>
                            <Row>Email: {instruktor.email} </Row>
                            {prikazInstruktor ? <Row><Button onClick={()=>obrisiInstruktoraSaCasa(instruktor.id)}>Obriši instruktora</Button></Row>:null} 

                        </div>
                    ))
                  }
              
             </Modal.Body>
              <Modal.Footer>
                 
                  <Button onClick={()=>setModalInstruktori(false)}>Ok</Button>
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
                            <Row>Ime instruktora:{termin.imeInstruktora}</Row>
                            <Row>Prezime instruktora:{termin.prezimeInstruktora}</Row>
                            {prikazClan ?<Row><Button onClick={()=>zakaziTermin(termin.id)}>Zakazi termin</Button></Row>:null}

                        </div>
                    ))
                  }
              
             </Modal.Body>
              <Modal.Footer>
                 
                  <Button onClick={()=>setModalTermini(false)}>Ok</Button>
              </Modal.Footer>
          </Modal>
         

          <Modal show={modalDodajCas}>
          <Modal.Header>Dodaj novi cas</Modal.Header> 
              <Modal.Body>
              <Row>Naziv: <input  className='unosIzmena' onChange={e=>setNaziv(e.target.value)} /></Row>
              {validacijaNaziv?<Row style={{color:'red'}} className='redValidacija' >Morate uneti naziv.</Row>:null}
              <Row>Cena po treningu: <input className='unosIzmena' onChange={e=>setCena(e.target.value)}/> </Row>
              {validacijaCena?<Row style={{color:'red'}} className='redValidacija'>Morate uneti cenu.</Row>:null}
              
    
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>dodajNoviCas() }>Potvrdi</Button>
                  <Button onClick={()=>setModalDodajCas(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalObrisi}>
              
              <Modal.Body>
              <Alert className='alert alert-info'>Da li ste sigurni da želite da obrišete ovaj cas iz ponude?</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>obrisiClana() }>Potvrdi</Button>
                  <Button onClick={()=>setModalObrisi(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>



          <Modal show={modalUspesnoBrisanje}>
              <Modal.Header >Uspešno brisanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste obrisali ovaj cas<i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={uspesnoBrisanje}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalBrisanjeGreska}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je, došlo je do greške prilikom brisanja casa.Molimo Vas pokušajte ponovo.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalBrisanjeGreska(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={modalUspesnoZakazivanjeClan}>
              <Modal.Header >Uspešno zakazivanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste zakazali novi termin<i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={uspesnoZakazivanje}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalZakazivanjeGreskaBroj}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je,ne možete zakazati ovaj termin, maksimalni kapacitet je popunjen.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalZakazivanjeGreskaBroj(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={modalDodajInstruktoraCasu}>
              <Modal.Header >Izaberite instruktora</Modal.Header>
              <Modal.Body>
                  {instruktori.pod.map((instruktor)=>(
                      <Row key={instruktor.id} style={{marginBottom:'5px'}}>{instruktor.ime} {instruktor.prezime} <Button onClick={()=>dodajInstruktoraIzabrInstr(instruktor.id)}>Izaberi</Button></Row>
                  ))

                  }
              
             </Modal.Body>
              <Modal.Footer>
                 
                  <Button onClick={()=>setModalDodajInstruktoraCasu(false)}>Otkaži</Button>
              </Modal.Footer>
          </Modal>
         

          <Modal show={modalUspesnoDodavanje}>
              <Modal.Header >Uspešno dodavanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste dodali novi cas<i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={uspesnoDodavanje}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalDodavanjeGreska}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je, došlo je do greške prilikom dodavanja.Molimo Vas pokušajte ponovo.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalDodavanjeGreska(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>


          {spin?<LoadingSpin/>:null}
            
        </div>
    )
}