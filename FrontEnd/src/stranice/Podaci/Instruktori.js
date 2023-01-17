import React,{useState,useEffect,useMemo} from 'react'
import {Table,Button,Modal,Alert,Row} from 'react-bootstrap'
import "./Podaci.css"
import PaginationComponent from '../../komponente/PaginationComponent'
import Search from '../../komponente/Search'
import LoadingSpin from '../../komponente/LoadingSpin'
import {Select} from '@material-ui/core'

export default function Instruktori() {
   
    const [podaci,setPodaci]=useState({pod:[]})
    const [ukupnoStavki,setUkupnoStavki]=useState(0)
    const [trStranica,setTrStranica]=useState(1)
    const [pretrazi,setPretrazi] =useState("")
    const STAVKE_PO_STRANICI=5
    const [modalUspesnoBrisanje,setModalUspesnoBrisanje]=useState(false)
    const [modalBrisanjeGreska,setModalBrisanjeGreska]=useState(false)
    const [modalObrisi,setModalObrisi]=useState(false)
    const [idBrisanje,setIdBrisanje]=useState("")
 
    
    
    const [spin,setSpin]=useState(false)

   
    
    useEffect(() => {
        
       fetch("https://localhost:5001/SkolaKlizanja/PreuzmiInstruktore").then(pod=>{
           pod.json().then(instruktori=>{
              
               setPodaci({pod:instruktori})
              
            })
       })
        
        
    }, [])

    const obrisiInstruktora=()=>
     {
         setModalObrisi(false)
         setSpin(true)
         fetch("https://localhost:5001/SkolaKlizanja/ObrisiInsruktora/"+idBrisanje,{
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

    const potvrdiBrisanje=(id)=> {
         console.log("Brisanje")
        setModalObrisi(true)
        setIdBrisanje(id)
        
        
      }
      const uspesnoBrisanje=()=>{
        setModalUspesnoBrisanje(false)
        window.location.reload()
    }
    const sviInstruktori=useMemo(()=>{

        let obv=podaci.pod;
        
        if(pretrazi)
        {
            obv=obv.filter(
                obav=>
                obav.ime.toLowerCase().includes(pretrazi.toLowerCase()) ||
                obav.prezime.toLowerCase().includes(pretrazi.toLowerCase())
            )
        }
        setUkupnoStavki(obv.length)
        
        
        
    
        return obv.slice((trStranica-1)*STAVKE_PO_STRANICI,(trStranica-1)*STAVKE_PO_STRANICI+STAVKE_PO_STRANICI)
    
     },[podaci,trStranica,pretrazi])
    

    
 


    return (
        <div className='podaciCont'>
       <Search 
             pretrazi={(value)=>{
               setPretrazi(value)
               setTrStranica(1)
           }}/>
         <PaginationComponent
            ukupno={ukupnoStavki}
            stavkePoStranici={STAVKE_PO_STRANICI}
            trenutnaStranica={trStranica}
            promeniStranicu={page=>setTrStranica(page)}/>
   
    <Table striped bordered hover >
  <thead>
    <tr>
      <th>ID</th>
      <th>Ime</th>
      <th>Prezime</th>
      <th>Korisnicko ime</th>
      <th>Email</th>
      <th>Telefon</th>
      
    </tr>
  </thead>
  <tbody>
      {
          sviInstruktori.map((trener)=>(
            <tr key={trener.id}>
            <td>{trener.id}</td>
            <td>{trener.ime}</td>
            <td>{trener.prezime}</td>
            <td>{trener.korisnickoIme}</td>
            <td>{trener.email}</td>
            <td>{trener.telefon}</td>
            
            <td><Button  onClick={()=>potvrdiBrisanje(trener.id)}>Obriši</Button></td>
          </tr>
          ))
      }
   
  </tbody>
</Table>
         <Modal show={modalObrisi}>
              
              <Modal.Body>
              <Alert className='alert alert-info'>Da li ste sigurni da želite da obrišete ovog trenera?</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>obrisiInstruktora() }>Potvrdi</Button>
                  <Button onClick={()=>setModalObrisi(false)}>Poništi</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalUspesnoBrisanje}>
              <Modal.Header >Uspešno dodavanje</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-success'>Uspešno ste obrisali ovog trenera <i className="far fa-check-circle ikonica"></i></Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={uspesnoBrisanje}>Ok</Button>
              </Modal.Footer>
          </Modal>

          <Modal show={modalBrisanjeGreska}>
              <Modal.Header >Greška</Modal.Header>
              <Modal.Body>
              <Alert className='alert alert-danger'>Žao nam je, došlo je do greške prilikom brisanja trenera.Molimo Vas pokušajte ponovo.</Alert>
             </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>setModalBrisanjeGreska(false) }>Ok</Button>
              </Modal.Footer>
          </Modal>



     
          {spin?<LoadingSpin/>:null}
   
    </div>
    )
}
