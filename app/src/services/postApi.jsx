import axios from 'axios'

//post data user
export const postDataToApi = async (url, body)=>{
    try{
        const res = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_POST}${url}`,
            headers: {
                Authorization: localStorage.getItem('token'),
                enctype: 'multipart/form-data'
            },
            data: body
        });
        if(res.status == 201){
            return {"message": "ok"}
        }
    }catch(err){
        return err
    }
}