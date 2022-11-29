const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino = '', res = response) =>{

    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.status(200).json({
            results: (usuario) ? [ usuario ] : [] //si el usuario existe lo mando sino devuelvo un array vacio
        })
    }

    const regex = new RegExp( termino, 'i') //Busqueda no sensible a mayusculas, aparece todo lo que tenga relacion al termino

    const usuarios = await Usuario.find({ 
        $or: [ { nombre : regex }, { correo: regex } ], //El correo o el nombre coincida con la expresion regular
        $and: [{ estado: true }]
    })

    const cantidad = await Usuario.count({ 
        $or: [ { nombre : regex }, { correo: regex } ], //El correo o el nombre coincida con la expresion regular
        $and: [{ estado: true }]
    })

    res.json({
        cantidad: cantidad,
        results: usuarios
    })

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
        break
        case 'categoria':

        break
        case 'productos':

        break
        case 'roles':

        break
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}