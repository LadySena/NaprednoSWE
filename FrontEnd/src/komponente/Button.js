
import './Button.css'
const STIL =['btn--prymary','btn--outline']
const VELICINA=['btn--medium','btn--large']
export const Button=({children,type,onClick,BStyle,BSize})=>{
    const checkButtonStyle=STIL.includes(BStyle)? BStyle:STIL[0]
    const checkButtonSize=STIL.includes(BSize)? BSize:VELICINA[0]

    return(
    
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}>
                {children}
            </button>
      
    )
}