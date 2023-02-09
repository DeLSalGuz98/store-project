import { useEffect, useState } from "react"
import { Card } from "../components/card/card"
import { getDataApi } from '../services/getApi'
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";

export function MyStores() {
    const navigate = useNavigate()
    const [allStores, setAllStores] = useState({});
    useEffect(()=>{
        getAllStores()
    }, []);
    const getAllStores = async()=>{
        const res = await getDataApi('/all-stores');
        setAllStores(res)
    }
    const handleClick = (idStore)=>{
        navigate(`/store/${idStore}/all-products`)
    }
    return(
        <div className="storesContainer">
            {
                allStores.length > 0 ? allStores.map(store =>{
                    return(
                        <Card key={store.id_store}>
                            <span>{store.name}</span>
                            <span>{dateFormat(store.date, "dddd, mmmm dS, yyyy")}</span>
                            <input className="single-btn" type="button" value="Go Store" onClick={()=>{handleClick(store.id_store)}}/>
                        </Card>
                    )
                }): <></>
            }
        </div>
    )
}