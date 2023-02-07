import axios from 'axios'

//get data user
export const getDataUser = async (url)=>{
    try{
        const res = await axios({
            method: 'get',
            url: 'http://localhost:3000/api-get/profile',
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