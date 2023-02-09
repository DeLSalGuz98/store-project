import { useEffect } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { Header } from "../components/header/header";
import { NavUser } from "../components/navUser/navUser"

export function StorePage(){
    const {idStore} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(Boolean(localStorage.getItem('userAuth'))!= true){
            navigate('/');
        }
    }, []);
    return(
        <>
            <Header/>
            <section className="store-container">
                <NavUser/>
                <section className="container-app">
                    <Outlet/>
                </section>
            </section>
        </>
    )
}