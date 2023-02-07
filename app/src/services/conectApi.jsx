import axios from 'axios'
//register and auth user
export const sendDataToApi = async(url, data)=>{
    try{
        const res = await axios.post(url, data);
        return res
    }catch(err){
        return err
    }

}