import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataApi } from "../../services/getApi";
import './header.css';
export function Header(){
    const [userName, setUserName] = useState('')
    const [isAuth, setIsAuth] = useState(false);
    useEffect(()=>{
        if(Boolean(localStorage.getItem('userAuth')) == true){
            setIsAuth(true)
            userData();
        }
    },[]);
    //userData
    const userData = async ()=>{
        const res = await getDataApi('/profile');
        setUserName(`${res.name} ${res.lastname}`)
    }
    return(
        <header className="header">
            <h1><Link className="nameStore" to="/">Store</Link></h1>
            {
                isAuth ==true? <span className="header-userName">{userName}<ion-icon name="person-circle-outline"></ion-icon></span> :
                <nav>
                    <ul className="header-nav">
                        <li><Link className="header-itemNav" to="/login">Log In</Link></li>
                        <li><Link className="header-itemNav" to="/signup">Sign Up</Link></li>
                    </ul>
                </nav> 
            }
        </header>
    )
}