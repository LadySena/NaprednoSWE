import React,{useState} from 'react'

const Search =({pretrazi})=>{

    const [pretrazivac,setPretrazivac]=useState('')

    const onInputChange=(value)=>{
        setPretrazivac(value)
        pretrazi(value)

    }
    return(
        <input
        type="text"
        className='form-control'
        placeholder='Pretrazi...'
        value={pretrazivac}
        onChange={(e)=>onInputChange(e.target.value)}
        />
    )
}
export default Search