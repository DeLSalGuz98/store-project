import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import { sendDataToApi } from '../../services/conectApi'
import { postDataToApi } from '../../services/postApi';
import { putDataApi } from '../../services/putApi';

const putRoutes = [
    {
        url: '/edit-user',
        redirect: '/'
    },
    {
        url: '/edit-product',
        redirect: '/'
    },
    {
        url: '/send-product',
        redirect: '/'
    },
    {
        url: '/upload-photo-user',
        redirect: '/'
    }
    
]
const postRoutes= [
    {
        url: '/new-store',
        redirect: '/user/my-stores'
    }
]

export function FormComponent({children, titleForm, submitData, url, btnName, classForm}){
    const navigate = useNavigate();
    let redirect = '';
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
                if(res.response != undefined){
                    if(res.response.request.status != 200){
                        alert(res.response.data.message);
                        setWaitRes(false);
                    }
                }else{
                    localStorage.setItem('userAuth', res.auth);
                    localStorage.setItem('token', res.token);
                    setWaitRes(false);
                    navigate("/user");
                }
        }else if(putRoutes.find(e=> {if(e.url == url){ redirect = e.redirect; return true} })){
            await putDataApi(url, submitData)
            setWaitRes(false); 
            navigate(redirect); 
        }
        else if(postRoutes.find(e=> {if(e.url == url){ redirect = e.redirect; return true} })){
            await postDataToApi(url, submitData);
            setWaitRes(false);
            navigate(redirect);
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