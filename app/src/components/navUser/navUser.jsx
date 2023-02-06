import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import man from '../../assets/u_man.jpg';
import './navUser.css'

export function NavUser(){
    const navigate = useNavigate();
    const exitSession = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userAuth');
        navigate('/');
    }
    return(
        <div className="user">
            <div className="user-data">
                <img className="user-photo" src={man} alt="User Photo" />
                <p className="user-name">Name Lastname</p>
            </div>
            <nav className="user-nav">
                <ul>
                    <li><Link className="user-navItem" to="/store">See Products</Link></li>
                    <li><Link className="user-navItem" to="/store/create-store">Create Store</Link></li>
                    <li><Link className="user-navItem" to="/login">My Stores</Link></li>
                    <li><Link className="user-navItem" to="/login">Shipping Cart</Link></li>
                    <li><Link className="user-navItem" to="/login">Edit my Data</Link></li>
                    <li><a className="user-navItem" href="#" onClick={exitSession}>Exit Session</a></li>
                </ul>
            </nav>
        </div>
    )
}