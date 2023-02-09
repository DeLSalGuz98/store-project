import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putDataApi } from "../../services/putApi";
import './formImage.css';

export function FormImage(params) {
    const navigate = useNavigate()
    const [imgRender, setImgRender] = useState('')
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await putDataApi('/upload-photo-user',formData);
        navigate('/');
    }
    const handleChange = (e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImgRender(reader.result);
        }
    }
    return(
        <form className="form form-two" onSubmit={handleSubmit}>
            <div className="photoContainer">
                <img className="photoChoose" src={imgRender} alt="new photo user" />
            </div>
            <input className="inputFile" type="file" name="image" accept="image/png, image/jpg, image/jpeg" onChange={handleChange}/>
            <input className="btn-form" type="submit" value="Send Photo" />
        </form>
    )
}