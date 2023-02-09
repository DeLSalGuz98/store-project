import { HomeConatiner } from "../components/homeContainer/homeContainer"
import { FormComponent } from "../components/form/form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
export function Login(){
    const [credentials, setCredentials] = useState({
        "user_name": "",
        "password": ""
    });
    const navigate = useNavigate();
    useEffect(()=>{
        if(Boolean(localStorage.getItem('userAuth')) == true){
            navigate('/user');
        }
    }, []);
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    } 
    return(
        <HomeConatiner>
            <FormComponent
                titleForm='Wellcome Again'
                url='/login-user'
                submitData={credentials}
                btnName='Log in'
                classForm='form-one'
            >
                <input className='input' name="user_name" type="text" placeholder='User Name' onChange={handleChange} required/>
                <input className='input' name="password" type="password" placeholder='Password' onChange={handleChange} required/>
            </FormComponent>
        </HomeConatiner>
    )
}