export const GetDate = ()=>{
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return date
}
