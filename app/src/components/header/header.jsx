import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './header.css';
export function Header(){
    const [isAuth, setIsAuth] = useState(false);
    useEffect(()=>{
        if(Boolean(localStorage.getItem('userAuth')) == true){
            setIsAuth(true)
        }
    },[isAuth]);
    return(
        <header className="header">
            <h1><Link className="nameStore" to="/">Store</Link></h1>
            {
                isAuth ==true? <span className="header-userName">Name LastName</span> :
                <nav>
                    <ul className="header-nav">
                        <li><Link className="header-itemNav" to="/login">Log In</Link></li>
                        <li><Link className="header-itemNav" to="signup">Sign Up</Link></li>
                    </ul>
                </nav> 
            }
        </header>
    )
}