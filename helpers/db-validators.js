const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol } )
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
}

const emailExiste = async( correo = '') => {
    const mailExiste= await Usuario.findOne({ correo })
    if(mailExiste){
        throw new Error(`El correo ${ correo } ya esta registrado`)
    }
}

const existeUsuarioPorID = async( id ) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido, emailExiste, existeUsuarioPorID
}