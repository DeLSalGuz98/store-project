import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import { sendDataToApi } from '../../services/conectApi'
import { postDataToApi } from '../../services/postApi';

export function FormComponent({children, titleForm, submitData, url, btnName, classForm}){
    const navigate = useNavigate();
    const [newClass, setNewClass] = useState('form-one')
    const [waitRes, setWaitRes] = useState(false);
    useEffect(()=>{
        setNewClass(classForm);
    },[]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setWaitRes(true);
        if(url == '/login-user' || url == '/new-user'){
                const res = await sendDataToApi(url, submitData);
                console.log(res)
                if(res.response != undefined){
                    if(res.response.request.status != 200){
                        alert(res.response.data.message);
                        setWaitRes(false);
                    }
                }else{
                    localStorage.setItem('userAuth', res.auth);
                    localStorage.setItem('token', res.token);
                    setWaitRes(false);
                    navigate("/store");
                }
        }else{
            const res = await postDataToApi(url, submitData);
            console.log(res)
        }
    }
    return(
        <form className={`form ${newClass}`} onSubmit={handleSubmit}>
            <h2 className='title-form'>{titleForm}</h2>
            <div className='container-form'>
                {children}
                <input className='btn-form' type="submit" value={waitRes == true? 'wait a moment...' : btnName} />
                {
                    url == '/login-user'? 
                    <Link className='link' to="/signup">Sign up</Link>: 
                    url == '/new-user'?
                    <Link className='link' to="/login">I have already an acount</Link>:
                    <></>
                }
            </div>            
        </form>
    )
}