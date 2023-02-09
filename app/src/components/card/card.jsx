import './card.css'
export const Card = ({children})=>{
    return(
        <div className="card-large">
            {children}
        </div>
    )
}