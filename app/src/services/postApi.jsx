import axios from 'axios'

//post data user
export const postDataToApi = async (url, body)=>{
    try{
        const res = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_POST}${url}`,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: body
        });
        if(res.status == 200){
            return res.data
        }
    }catch(err){
        return err
    }
}