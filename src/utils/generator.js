export const createUserData = (nombre, apellido, cedula) => {
    cedula = cedula.toString();
    nombre = nombre.trim();
    nombre = nombre.substr(0, 3);
    const usuario = nombre.toLowerCase() + cedula.substr(-4);
    apellido = apellido.trim();
    apellido = apellido.substr(0, 3);
    const contraseña = apellido.toLowerCase() + cedula.substr(0, 3);
    return { usuario, contraseña, rol: 'empleado', vacuna: "", dosis: [] , estado: 'no vacunado' };
  };