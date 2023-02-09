import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './formNewProduct.css'
export const FormNewProduct = ()=>{
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
        <form className='form-three'>
            <h2 className='title-form'>Create New Product</h2>
            <div className='cols-2'>
                <div className="productInformation">
                    <input className='input input-border' type="text" name="nameProduct" placeholder="Name"/>
                    <input className='input input-border' type="text" name="price" placeholder="Price" />
                    <textarea className='input-border text-area' name="" maxLength={190}  placeholder='Add a description'></textarea>
                </div>
                <div className="productImage">
                <div className="photoContainer">
                <img className="photoChoose" src={imgRender} alt="new photo user" />
            </div>
            <input className="inputFile" type="file" name="image" accept="image/png, image/jpg, image/jpeg" onChange={handleChange}/>
                </div>
            </div>
            <input className='btn-form' type="submit" value="Create" />
        </form>
    )
}