var data = localStorage.getItem('users')
if (data) {
    data = JSON.parse(data)
}
else{
    data = []
}
export const AddNewUser = (user) =>{
    const state = data.filter(e=> e.cedula === user.cedula ||  e.usuario=== user.usuario)
    if(state.length!==0) return false
    const newUser = [
        ...data, user
    ]
    localStorage.setItem('users',JSON.stringify(newUser))
    return true
}

export const findUser =  (Ci)=> {
    let auth = data?data.filter(e=> e.cedula === Ci):false
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

export const getUsers =()=>{
    let users = data.filter(e=>e.rol==="empleado")
    return users
}

export const deleteUser=(ci)=>{
    data = data.filter(e=> e.cedula!== ci)
    localStorage.setItem('users',JSON.stringify(data))
}
export const updateUser=(value, CI)=>{
    try {
    data = data.map(e=>{
        if (e.cedula === CI) {
                e.nombre = value.nombre
                e.apellido = value.apellido
                e.email = value.email
            }
            return e
    })
    localStorage.setItem('users',JSON.stringify(data))
    return true    
    } catch (error) {
        return false
    }
    
}
export const updateUser_=(value, CI)=>{
    try {
    data = data.map(e=>{
        if (e.cedula === CI) {
                Object.keys(value).map(keys=>{
                    e[keys] = value[keys]
                })
            }
            return e
    })
    localStorage.setItem('users',JSON.stringify(data))
    return true    
    } catch (error) {
        return false
    }
    
}




