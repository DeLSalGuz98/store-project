import { Link } from "react-router-dom"
import { HomeConatiner } from "../components/homeContainer/homeContainer"
export function Home() {
    return (
        <HomeConatiner>
            <Link className='btn' to="/login">
                Start
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </Link>
        </HomeConatiner>
    )
}