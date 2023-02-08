import axios from 'axios';

export const putDataApi = async(url, data)=>{
    try{
        const res = await axios({
            method: 'put',
            url: `${import.meta.env.VITE_API_PUT}${url}`,
            headers: {
                Authorization: localStorage.getItem('token'),
                enctype: 'multipart/form-data'
            },
            data: data
        });
        if(res.status == 200){
            return res.data
        }
    }catch(err){
        return err
    }
}