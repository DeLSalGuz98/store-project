import { useEffect, useState } from "react";
import { FormComponent } from "../components/form/form";
import { FormImage } from "../components/formImage/formImage";
import { getDataApi } from "../services/getApi";

export function EditUser(){
    const [userData, setUserData] = useState({
        "name":"",
        "lastname":"",
        "user_name": "",
        "country":"",
        "city": "",
        "address": ""
    });
    useEffect(()=>{
        getDataUser();
    },[]);
    const getDataUser = async()=>{
        const res = await getDataApi('/profile')
        //console.log(res)
        setUserData({...userData, 
            "name": res.name,
            "lastname":res.lastname,
            "user_name": res.user_name,
            "country":res.country,
            "city": res.city,
            "address": res.address
        })
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    } 
    return (
        <div className="user-editData">
            {/**falta enviar la informacion para actualizar la informacion del usuario */}
            <FormComponent
                titleForm="Edit Data User"
                submitData={userData}
                url='/edit-user'
                btnName='Update Data'
                classForm='form-two'
            >
                <input className='input input-border' name="name" type="text" placeholder='Name' onChange={handleChange} required value={userData.name}/>
                <input className='input input-border' name="lastname" type="text" placeholder='Lastname' onChange={handleChange} required value={userData.lastname}/>
                <input className='input input-border' name="user_name" type="text" placeholder='User Name' onChange={handleChange} required value={userData.user_name}/>
                {/* <input className='input input-border' name="password" type="password" placeholder='Password' onChange={handleChange} required/> */}
                <input className='input input-border' name="country" type="text" placeholder='Country' onChange={handleChange} required value={userData.country}/>
                <input className='input input-border' name="city" type="text" placeholder='City' onChange={handleChange} required value={userData.city}/>
                <input className='input input-border' name="address" type="text" placeholder='Address' onChange={handleChange} required value={userData.address}/>
            </FormComponent>
            <FormImage/>
        </div>
    )
}