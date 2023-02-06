import { Outlet } from "react-router-dom"
import { NavUser } from "../components/navUser/navUser"

export function UserPage(){
    return(
        <section className="store-container">
            <NavUser/>
            <Outlet/>
        </section>
    )
}