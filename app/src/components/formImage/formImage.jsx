import { putDataApi } from "../../services/putApi";
export function FormImage(params) {
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await putDataApi('/upload-photo-user',formData);
        console.log(res)
    }
    return(
        <form onSubmit={handleSubmit}>
            {/**falta dar estilos y previsualizar la imagen */}
            <input type="file" name="image"/>
            <input type="submit" value="Send Photo" />
        </form>
    )
}