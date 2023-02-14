import { useEffect, useState } from "react";
import { getDataApi } from "../services/getApi";
import { putDataApi } from "../services/putApi";
import { GetDate } from "../services/getDate";
import {useParams} from "react-router-dom";
import dateFormat from 'dateformat';
import { Card } from "../components/card/card";

export function Sales() {
    const {idStore} = useParams();
    const [sales, setSales] = useState([]);
    useEffect(()=>{
        getShippingPendings();
    }, []);
    const getShippingPendings = async()=>{
        const res = await getDataApi(`/sold-products/${idStore}`);
        setSales(res)
    }
    return(
        <div className="cartContainer">
            {
                sales.map(s =>{
                    return(
                        <Card
                            key={s.invoice_id}
                        >
                                <span><b>Product:</b>  {s.product}</span>
                                <span><b>date:</b> {dateFormat(s.date, 'dd/mm/yyyy')}</span>
                                <span><b>Total:</b> {s.total_price}</span>
                        </Card>
                    )
                })
            }
        </div>
    )
}