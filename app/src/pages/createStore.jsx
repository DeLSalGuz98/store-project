import { useEffect, useState } from "react";
import { FormComponent } from "../components/form/form";
import { GetDate } from "../services/getDate";

export function CreateStore(){
    const [store, setStore] = useState({
        "name": "",
        "type": "",
        "date": ""
    });
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setStore({...store, [name]: value, "date": GetDate()})
    }
    return(
        <div>
            <FormComponent
                titleForm="Create New Store"
                submitData={store}
                url='/new-store'
                btnName='Create'
            >
                <input className='input' name="name" type="text" placeholder='Store Name' onChange={handleChange} required/>
                <input className='input' name="type" type="text" placeholder='Type Products' onChange={handleChange} required/>
            </FormComponent>
        </div>
    )
}