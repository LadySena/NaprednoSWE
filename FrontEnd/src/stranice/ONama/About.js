import React,{useState,useRef,useEffect} from 'react'
import styled,{css} from 'styled-components/macro'
import {IoMdArrowRoundForward} from 'react-icons/io'
import {IoArrowForward,IoArrowBack} from 'react-icons/io5'
const AboutSection =styled.section ` 
height:60vh;
max-length:1100px;
position:relative;
overflow:hidden;
background-color: rgb(210, 170, 163);
justify-content:center;
align-items:center;
border-radius: 50px;
margin-top: 55px;

`
const AboutWrapper =styled.div ` 
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
overflow:hidden;
position:relative;


`
const AboutSlide =styled.div`
z-index:1;
width:100%;
height:100%;


`
const AboutSlider=styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
border-radius:25px;
`
const AboutImage=styled.img`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;

&::before{
    content:'';
    position:absolute;
    z-index:2;
    width:100%;
    height:vh;
    bottom:0vh;
    border-radius: 5px;  
    left:0;
    overflow:hidden;
    opacity:0.4;
    background:linear-gradient(0deg,rgba(0,0,0,0.2)0%,rgba(0,0,0,0.2)50%,rgba(0,0,0,0.2)100%);
}
`
const strelica=styled(IoMdArrowRoundForward)`
margin-left:0.5rem;
`
const SliderButton=styled.div`
position:absolute;
bottom:50px;
right:50px;
display:flex;
z-index:10;

`


const dugmeStrelica=css`
width:50px;
height:50px;
color:#fff;
cursor:pointer;
background:#000d1a;
border-radius:50px;
padding:10px;
margin-right:1rem;
user-select:none;
transition:0.3s;
&:hover{
    background:rgb(245, 237, 248);
    transform:scale(1.05);

}
`
const LeftArrowButton=styled(IoArrowBack)`
${dugmeStrelica}
`
const RightArrowButton=styled(IoArrowForward)`
${dugmeStrelica}
`

const  About=({slides})=> {

    const[current,setCurrent]=useState(0)
    const length=slides.length

    const timeout=useRef(null)
 
    useEffect(() => {
        const nextSlide=()=>{
            setCurrent(current===length-1?0:current+1)
        }
        timeout.current=setTimeout(nextSlide,3000)
        return function()
        {
            if(timeout.current)
            {
                clearTimeout(timeout.current)
            }
        }
    }, [current,length])

    const nextSlide=()=>{
        setCurrent(current===length-1? 0 : current+1)
        
    }
    const prevSlide=()=>{
        setCurrent(current===0? length-1 : current-1)
        
    }
    if(!Array.isArray(slides) || slides.length<=0)
    {
        return null;
    }


    return (
        <AboutSection>
            <AboutWrapper>
              {slides.map((slide,i)=>{
                  return(

                    <AboutSlide key={i}>
                        {i== current && (
                             <AboutSlider>
                             <AboutImage src={slide.image} alt={slide.alt}/>
                             
                        </AboutSlider>

                        )}
                   
                </AboutSlide>
                  )
              })}
            <SliderButton>
                <LeftArrowButton onClick={prevSlide}/>
                <RightArrowButton onClick={nextSlide}/>
            </SliderButton>
            </AboutWrapper>
        </AboutSection>
      )
}

export default About
