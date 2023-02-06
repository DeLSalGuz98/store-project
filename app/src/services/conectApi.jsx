import axios from 'axios'
export const sendDataToApi = async(url, data)=>{
    try{
        const res = await axios.post(url, data);
        return res
    }catch(err){
        return err
    }

}