import React,{useState,useEffect,useMemo} from 'react'
import Pagination from 'react-bootstrap/Pagination'

const PaginationComponent= ({ukupno=0,stavkePoStranici=1,trenutnaStranica=1,promeniStranicu})=>{
    
    const [ukupnoStranica,setUkupnoStranica]=useState(0)
    

    useEffect(()=>{
        if(ukupno>0 && stavkePoStranici>0)
        {
            setUkupnoStranica(Math.ceil(ukupno/stavkePoStranici))
            
        }

    },[ukupno,stavkePoStranici])

    const paginationStavke=useMemo(()=>{
        const stranice=[];
        for(let i=1;i<=ukupnoStranica;i++)
        {
            stranice.push(<Pagination.Item key={i} active={i===trenutnaStranica} onClick={()=>promeniStranicu(i)}>
                {i}
                </Pagination.Item>)
        }
        return stranice

    },[ukupnoStranica,trenutnaStranica])
    if(ukupnoStranica===0)
    return null;
    return(
        <Pagination>
        <Pagination.Prev onClick={()=>promeniStranicu(trenutnaStranica-1) }disabled={trenutnaStranica===1}/>
       {paginationStavke}
        <Pagination.Next onClick={()=>promeniStranicu(trenutnaStranica+1) }disabled={trenutnaStranica===ukupnoStranica}/>
        </Pagination>
    )
}
export default PaginationComponent