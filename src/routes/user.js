import { Router } from 'express';
import { userModel } from '../dao/models/chat/models/user.js';

const routerUser = Router();

routerUser.get('/', async(req,res) => {
    try{
        const msg = await userModel.find();
        res.send({resultado: 'success', valores: msg});
    }catch(error) {
        res.send("Error en la consulta users, mensaje: ", error.message)
    }
})

routerUser.post('/', async(req,res) => {
    try{
        const {user, message} = req.body
        const resultado = await userModel.create({
            user,
            message            
        });
        res.send({resultado: 'success', resultado: resultado});
    }catch(error) {
        res.send("Error en la consulta users, mensaje: ", error.message)
    }
})

export default routerUser