import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetDate } from '../../services/getDate'
import { postDataToApi } from '../../services/postApi'
import './formNewProduct.css'
export const FormNewProduct = ()=>{
    const navigate = useNavigate();
    const {idStore} = useParams();
    const [imgRender, setImgRender] = useState('');
    const [newProduct, setNewProduct] = useState({
        "name": "",
        "description": "",
        "price": "",
        "date": "",
        "stock": "",
        "image": "",
        "id_store": ""
    });
    useEffect(()=>{
        setNewProduct({...newProduct, date:GetDate()});
    },[]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', newProduct.name)
        formData.append('description', newProduct.description)
        formData.append('price', newProduct.price)
        formData.append('date', newProduct.date)
        formData.append('stock', newProduct.stock)
        formData.append('image', newProduct.image)
        formData.append('id_store', newProduct.id_store)
        await postDataToApi('/new-product', formData);
        // const formData = new FormData(e.currentTarget);
        // const res = await putDataApi('/upload-photo-user',formData);
        navigate(`/store/${idStore}/all-products`);
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setNewProduct({...newProduct, [name]:value, id_store:idStore});

    }
    const renderPicture = (e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImgRender(reader.result);
            const [file] = e.target.files;
            setNewProduct({...newProduct, image: file});
        }
    }
    return(
        <form className='form-three' onSubmit={handleSubmit}>
            <h2 className='title-form'>Create New Product</h2>
            <div className='cols-2'>
                <div className="productInformation">
                    <input className='input input-border' type="text" name="name" placeholder="Name" onChange={handleChange}/>
                    <input className='input input-border' type="number" name="stock" placeholder="Stock" onChange={handleChange}/>
                    <input className='input input-border' type="text" name="price" placeholder="Price" onChange={handleChange}/>
                    <textarea className='input-border text-area' name="description" maxLength={190}  placeholder='Add a description' onChange={handleChange}></textarea>
                </div>
                <div className="productImage">
                <div className="photoContainer">
                <img className="photoChoose" src={imgRender} alt="new photo user" />
            </div>
            <input className="inputFile" type="file" name="image" accept="image/png, image/jpg, image/jpeg" onChange={renderPicture}/>
                </div>
            </div>
            <input className='btn-form' type="submit" value="Create" />
        </form>
    )
}