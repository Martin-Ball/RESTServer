const { Router } = require('express')
const { check } = require('express-validator')
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators')
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validat-jwt')
const router = Router()


router.get('/', usuariosGet)  

//El segundo argumento es para definir middlewares
//check es un middleware que le paso cual es el campo que quiero validar
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //validacion contra base de datos
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost) 

router.put('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( (id) => existeUsuarioPorID(id) ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut) 

router.patch('/', usuariosPatch) 

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( (id) => existeUsuarioPorID(id) ),
    validarCampos
], usuariosDelete) 

module.exports = router