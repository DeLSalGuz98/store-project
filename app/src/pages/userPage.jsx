import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { NavUser } from "../components/navUser/navUser"

export function UserPage(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(Boolean(localStorage.getItem('userAuth'))!= true){
            navigate('/');
        }
    }, []);
    return(
        <section className="store-container">
            <NavUser/>
            <Outlet/>
        </section>
    )
}