
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");



const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
    }  

    try {

        const nombreCortado = req.files.archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length - 1]
        var tipos = undefined
        var carpeta = undefined
        
       //txt, md
       if(['txt', 'md'].includes(extension)){
        tipos = extension
        carpeta = 'textos'
       }else{
        carpeta = 'img'
       }

       const nombre = await subirArchivo( req.files, tipos, carpeta )

       res.json({
        nombre
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
    
}

module.exports = {
    cargarArchivo
}