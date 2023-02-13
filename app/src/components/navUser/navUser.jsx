import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import man from '../../assets/u_man.jpg';
import woman from '../../assets/u_woman.jpg';
import { getDataApi } from "../../services/getApi";
import './navUser.css'

export function NavUser(){
    const [user, setUser] = useState({});
    const [userHaveStores, setUserHaveStores] = useState(false);
    const storeParam = location.pathname.split('/')[2]
    const [isStoreUrl, setIsStoreUrl] = useState(false);
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();
    //component mount
    useEffect(()=>{
        userData();
        if(location.pathname.split('/')[1] == 'store'){
            setIsStoreUrl(true)
        }else{
            setIsStoreUrl(false)
        }
    },[]);
    //get user's data
    const userData = async ()=>{
        const res = await getDataApi(`/profile`);
        setUser(res);
        setUserPhoto(res);
        haveStores();
    }
    //get user photo
    const setUserPhoto = async(user)=>{
        if(!user.photo){
            if(user.sex == 'hombre'){
                setPhoto(man)
            }else{
                setPhoto(woman)
            }
        }else{
            setPhoto(`http://localhost:3000/images/${user.photo}`);
        }
    }
    //user have stores
    const haveStores = async ()=>{
        const res = await getDataApi('/all-stores')
        if(res.length != 0){
            setUserHaveStores(true)
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
                {
                    isStoreUrl ?
                    <ul>
                        <li><Link className="user-navItem" to={`/store/${storeParam}/new-product`}>Add New Product</Link></li>
                        <li><Link className="user-navItem" to={`/store/${storeParam}/all-products`}>All Products</Link></li>
                        <li><Link className="user-navItem" to={`/store/${storeParam}`}>Shipping Pending</Link></li>
                        <li><Link className="user-navItem" to={`/store/${storeParam}`}>Sales</Link></li>
                        <li><Link className="user-navItem" to="/user/my-stores">Return</Link></li>
                    </ul>
                    :
                    <ul>
                        <li><Link className="user-navItem" to="/user">See Products</Link></li>
                        <li><Link className="user-navItem" to="/user/create-store">Create Store</Link></li>
                        {
                            userHaveStores?
                            <li><Link className="user-navItem" to="/user/my-stores">My Stores</Link></li>
                            : <></>
                        }
                        <li><Link className="user-navItem" to="/user/shipping-cart">Shipping Cart</Link></li>
                        <li><Link className="user-navItem" to="/user/edit-user">Edit my Data</Link></li>
                        <li><a className="user-navItem" href="#" onClick={exitSession}>Exit Session</a></li>
                    </ul>
                }
            </nav>
        </div>
    )
}