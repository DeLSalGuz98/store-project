import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDataApi } from "../services/getApi";
import { postDataToApi } from "../services/postApi";
import '../styles/detailProduct.css';

export function DetailProduct(){
    const {idProduct} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState({
        "quantity": "1",
        "unit_price": "",  
        "id_product": "" 
    });
    useEffect(()=>{
        getDetailProduct();
    },[]);
    const getDetailProduct = async()=>{
        const res = await getDataApi(`/detail-product/${idProduct}`);
        setProduct(res);
        setCart({...cart, 
            "unit_price": res.price,  
            "id_product": res.id_product 
        });
    };
    const handleChange = (e)=>{
        const {name, value} = e.target;
        if(value <= product.stock){
            setCart({...cart, [name]:value});
        }else if(value > product.stock){
            alert(`stock insufiiente, stock maximo ${product.stock}`);
            setCart({...cart, [name]:product.stock});
        }
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const res = await postDataToApi('/add-shipping-cart', cart);
        if(res.message == "ok"){
            alert('agregado al carrito de compra');
            navigate('/user/shipping-cart');
        }
    }
    const returnPage = ()=>{
        navigate('/user');
    }
    return(
        <div className="detailContainer">
            <img className="imageDetail" src={`${import.meta.env.VITE_API_IMAGE}${product.image}`} alt="image" />
            <form className="formDetail" onSubmit={handleSubmit}>
                <h3 className="titleDetail">{product.product}</h3>
                <span className="subtitleDetail">{product.store}</span>
                <p className="descriptionDetail">{product.description}</p>
                <span className="descriptionDetail">stock: {product.stock}</span>
                <div className="cols-2">
                    <span className="priceDetail">${product.price}</span>
                    <label  htmlFor="quantity">
                        Cant.
                        <input className="quantityDetail" name="quantity" min={'1'} type="number" value={cart.quantity} onChange={handleChange}/>
                    </label>
                </div>
                <input className="btn-form marginTop" type="submit" value="Add Shipping Cart"/>
                <input className="btn-form red marginTop" type="button" value="Cancel"  onClick={returnPage}/>
            </form>
        </div>
    )
}