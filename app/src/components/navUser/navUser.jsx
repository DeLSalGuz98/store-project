import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import man from '../../assets/u_man.jpg';
import woman from '../../assets/u_woman.jpg';
import { getDataUser } from "../../services/getApi";
import './navUser.css'

export function NavUser(){
    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();
    //component mount
    useEffect(()=>{
        userData();
    },[]);
    //get user's data
    const userData = async ()=>{
        const res = await getDataUser();
        console.log(res)
        setUser(res)
        setUserPhoto(res);
    }
    const setUserPhoto = (user)=>{
        if(!user.photo){
            if(user.sex == 'hombre'){
                setPhoto(man)
            }else{
                setPhoto(woman)
            }
        }
    }
    //end user's session
    const exitSession = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userAuth');
        navigate('/');
    }
    return(
        <div className="user">
            <div className="user-data">
                <img className="user-photo" src={photo} alt="User Photo" />
                <p className="user-name">{`${user.name} ${user.lastname}`}</p>
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