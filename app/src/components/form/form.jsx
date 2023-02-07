import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import { sendDataToApi } from '../../services/conectApi'
import { postDataToApi } from '../../services/postApi';

export function FormComponent({children, titleForm, submitData, url, btnName}){
    const [waitRes, setWaitRes] = useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(url == '/auth'){
            console.log('post to auth');
        }else{
            const res = await postDataToApi(url, submitData);
            console.log(res)
        }
    }
    return(
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='title-form'>{titleForm}</h2>
            <div className='container-form'>
                {children}
                <input className='btn-form' type="submit" value={waitRes == true? 'wait a moment...' : btnName} />
            </div>            
        </form>
    )
}

export function LoginForm(){
    const navigate = useNavigate();
    const [waitRes, setWaitRes] = useState(false);
    const [authUser, setAuthUser] = useState({
        "user_name": "",
        "password": ""
    });
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setAuthUser({...authUser, [name]: value});
    }   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setWaitRes(true);
        const res = await sendDataToApi('http://localhost:3000/auth/login-user', authUser);
        if(res.response != undefined){
            if(res.response.request.status != 200){
                alert(res.response.data.message);
                setWaitRes(false);
            }
        }
        else if(res.status == 200){
            localStorage.setItem('userAuth', res.data.auth);
            localStorage.setItem('token', res.data.token);
            setWaitRes(false);
            navigate("/store");
        }
    }
    return(
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='title-form'>Wellcome  again</h2>
            <div className='container-form'>
                <input className='input' name="user_name" type="text" placeholder='User Name' onChange={handleChange} required/>
                <input className='input' name="password" type="password" placeholder='Password' onChange={handleChange} required/>
                <input className='btn-form' type="submit" value={waitRes == true? 'wait a moment...' : 'Log in'} />
                <Link className='link' to="/signup">Sign up</Link>
            </div>            
        </form>
    )
}
export function SignupForm(){
    const navigate = useNavigate();
    const [waitRes, setWaitRes] = useState(false);
    const [newUser, setNewUser] = useState({
        "name":"",
        "lastname":"",
        "sex": "",
        "user_name": "",
        "password": "",
        "country":"",
        "city": "",
        "address": ""
    });
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});
    }
    const handleSubmit = async(e)=>{
        setWaitRes(true);
        e.preventDefault();
        const res = await sendDataToApi('http://localhost:3000/auth/new-user', newUser)
        if(res.status == 200){
            console.log(res);
            localStorage.setItem('userAuth', res.data.auth);
            localStorage.setItem('token', res.data.token);
            navigate("/store");
            setWaitRes(false);
        }else{
            alert('sorry!, prove other username')
            setWaitRes(false);
        }
    }
    return(
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='title-form'>Insert your data please</h2>
            <div className='container-form'>
                <input className='input' name="name" type="text" placeholder='Name' onChange={handleChange} required/>
                <input className='input' name="lastname" type="text" placeholder='Lastname' onChange={handleChange} required/>
                <select className='input' name="sex" id="" defaultValue="" onChange={handleChange} required>
                    <option value="" disabled>Select your sex</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                </select>
                <input className='input' name="user_name" type="text" placeholder='User Name' onChange={handleChange} required/>
                <input className='input' name="password" type="password" placeholder='Password' onChange={handleChange} required/>
                <input className='input' name="country" type="text" placeholder='Country' onChange={handleChange} required/>
                <input className='input' name="city" type="text" placeholder='City' onChange={handleChange} required/>
                <input className='input' name="address" type="text" placeholder='Address' onChange={handleChange} required/>
                <input className='btn-form' type="submit" value={waitRes == true? 'wait a moment...' : 'Register'} />
                <Link className='link' to="/login">I have already an acount</Link>
            </div>            
        </form>
    )
}