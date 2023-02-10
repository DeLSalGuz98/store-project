import './cardProduct.css'
export const CardProduct = ({image, product, children})=>{
    return(
        <div className="card">
            <span className="card-name">{product}</span>
            <img className="card-image" src={image} alt={product} />
            <hr />
            {
                children
            }
        </div>
    )
}