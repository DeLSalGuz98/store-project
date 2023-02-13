import { useEffect, useState } from "react";
import { Card } from "../components/card/card";
import { getDataApi } from "../services/getApi";
import { postDataToApi } from "../services/postApi";
import { GetDate } from "../services/getDate";
import dateFormat from "dateformat";
import '../styles/shippingCard.css'


export function ShippingCart(params) {
    const [allProducts, setAllProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(()=>{
        getShippingCart();
    },[]);
    const getShippingCart = async()=>{
        const res = await getDataApi('/shipping-cart');
        setAllProducts(res)
        sumAmount(res);
    }
    const sumAmount = (res)=>{
        let amount = 0
        res.map(p=>{
            amount = amount + parseFloat(p.total_price)
            setTotalAmount(amount.toFixed(2))
        })
    }
    const handleClick = async(product)=>{
        const desition = confirm('Esta seguro que quiere comprar?')
        if(desition){
            const buyProduct = {
                "quantity":product.quantity,
                "id_product":product.product_id,
                "date": GetDate(),  
                "total_price": product.total_price,
                "id_store": product.id_store,
                "id_order_buy": product.order_id
            }
            const res = await postDataToApi('/buy-product', buyProduct)
            if(res.message == 'ok'){
                getShippingCart()
            }
        }
    }
    return(
        <div className="cartContainer">
            <span className="amountOrder">Total amount: {totalAmount}</span>
            {
                allProducts.map(p =>{
                    return(
                        <Card
                            key={p.order_id}
                        >
                            <img className="imageOrder" src={`${import.meta.env.VITE_API_IMAGE}${p.image}`} alt="image-product" />
                            <div className="descriptionOrder">
                                <span>Date: {dateFormat(p.date, 'dd/mm/yyyy')}</span>
                                <span>Product: {p.product}</span>
                                <span>Cant. {p.quantity}</span>
                                <span>Unit Price: {p.unit_price}</span>
                                <span>Total Price: {p.total_price}</span>
                            </div>
                            <input className="single-btn" type="button" value="Buy" onClick={()=>{handleClick(p)}}/>
                        </Card>
                    )
                })
            }
        </div>
    )
}