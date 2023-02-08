import { HomeConatiner } from "../components/homeContainer/homeContainer"
import { FormComponent } from "../components/form/form"
import { useState } from "react";
export function Signup(){
    const [userData, setUserData] = useState({
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
        setUserData({...userData, [name]: value});
    } 
    return(
        <HomeConatiner>
            <FormComponent
                titleForm='Insert your data please'
                url='/new-user'
                submitData={userData}
                btnName='Register'
                classForm='form-one'
            >
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
            </FormComponent>
        </HomeConatiner>
    )
}