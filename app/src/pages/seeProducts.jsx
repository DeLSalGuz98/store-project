import { useEffect, useState } from "react"
import { getDataApi } from "../services/getApi";
import { CardProduct } from "../components/cardProduct/cardProduct";
export function SeeProducts(){
    const [allProducts, setAllProducts] = useState([]);
    useEffect(()=>{
        getAllProducts();
    }, []);
    const getAllProducts = async()=>{
        const res = await getDataApi(`/all-products`);
        setAllProducts(res)
    }
    return(
        <div className="products-container">
            {
                allProducts.map(p=>{
                    console.log(p)
                    return(
                        <CardProduct
                            key={p.id_product}
                            product={p.product}
                            image={`${import.meta.env.VITE_API_IMAGE}${p.image}`}
                        >
                            <span className="card-price" >Price: $ {p.price}</span>
                            <span className="card-price" >Store: {p.store}</span>
                            <input className="card-btn green" type="button" value="See Details" />
                        </CardProduct>
                    )
                })
            }
        </div>
    )
}