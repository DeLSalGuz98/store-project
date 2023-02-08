import axios from 'axios'
//register and auth user
export const sendDataToApi = async(url, data)=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_AUTH}${url}`, data);
        if(res.status == 200){
            return res.data
        }else{
            return res
        }
    }catch(err){
        return err
    }

}