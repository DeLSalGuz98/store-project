import { useEffect, useState } from "react";
import { getDataApi } from "../services/getApi";
import { putDataApi } from "../services/putApi";
import { GetDate } from "../services/getDate";
import {useParams} from "react-router-dom";
import dateFormat from 'dateformat';
import { Card } from "../components/card/card";

export function ShippingPending(params) {
    const {idStore} = useParams();
    const [orders, setOrders] = useState([]);
    const url = '/send-product/:id_invoice'
    useEffect(()=>{
        getShippingPendings();
    }, []);
    const getShippingPendings = async()=>{
        const res = await getDataApi(`/shipping-pending/${idStore}`);
        setOrders(res)
    }
    const handleClick = async(idInvoice)=>{
        const res = await putDataApi(`/send-product/${idInvoice}`,{"date": GetDate()})
        if (res.status == 200){
            alert('product sending')
            getShippingPendings();
        }
    }
    return(
        <div className="cartContainer">
            {
                orders.map(o =>{
                    console.log(o)
                    return(
                        <Card
                            key={o.invoice_id}
                        >
                            <img className="imageOrder" src={`${import.meta.env.VITE_API_IMAGE}${o.image}`} alt="photo order" />
                            <div className="descriptionOrder">
                                <span><b>Product:</b>  {o.product}</span>
                                <span><b>Quantity</b>: {o.quantity}</span>
                                <span><b>Client:</b> {o.client}</span>
                                <span><b>Country:</b> {o.country}</span>
                                <span><b>City:</b> {o.city}</span>
                                <span><b>Address:</b> {o.address}</span>
                                <span><b>date:</b> {dateFormat(o.date, 'dd/mm/yyyy')}</span>
                            </div>
                            <input className="single-btn" type="button" value="Send Order" onClick={()=>{handleClick(o.invoice_id)}}/>
                        </Card>
                    )
                })
            }
        </div>
    )
}