import dataJson from '../utils/empleados.json'
var data = localStorage.getItem('users')
if (data) {
    data= JSON.parse(data)
}
export const findUser =  (usuario, password)=> {
    let auth = data?data.filter(e=> e.usuario === usuario && e.contraseña === password):false
    if (auth) {
        return auth[0]     
    }else{
        auth = dataJson.filter(e=> e.usuario===usuario && e.contraseña === password)
        if (auth) {
            return auth[0] 
        }else{
            return false 
        }
    }
}