import axios from 'axios'

//get data user
export const getDataApi = async (url)=>{
    try{
        const res = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_GET}${url}`,
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        if(res.status == 200){
            return res.data
        }
    }catch(err){
        return err
    }
}