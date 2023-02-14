import { useEffect, useState } from "react"
import { getDataApi } from "../services/getApi";
import { useNavigate, useParams } from 'react-router-dom'
import { CardProduct } from "../components/cardProduct/cardProduct";
export function AllProducts(){
    const {idStore} = useParams();
    const [allProducts, setAllProducts] = useState([]);
    useEffect(()=>{
        getAllProducts();
    }, []);
    const getAllProducts = async()=>{
        const res = await getDataApi(`/all-products/${idStore}`);
        setAllProducts(res)
    }
    const editProduct = () =>{
        alert('Lo siento, esta funcion aun no esta implementada')
    }
    const deleteProduct = ()=>{
        alert('Lo siento. Las rutas para eliminar un producto aun no estan listas')
    }
    return(
        <div className="products-container">
            {
                allProducts.map(p=>{
                    return(
                        <CardProduct
                            key={p.id_product}
                            product={p.product}
                            image={`${import.meta.env.VITE_API_IMAGE}${p.image}`}
                        >
                            <span className="card-price" >Price: ${p.price}</span>
                            <input className="card-btn green" type="button" value="Edit" onClick={editProduct} />
                            <input className="card-btn red" type="button" value="Delete" onClick={deleteProduct}/>
                        </CardProduct>
                    )
                })
            }
        </div>
    )
}