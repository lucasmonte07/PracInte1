import { Router } from 'express';
import ManagerMongoDB from './../dao/db/mongoDBManager.js'

const productoMDB = new ManagerMongoDB()

const routerProd = Router()

routerProd.get('/', async (req, res) => {    
    let limite = parseInt(req.query.limit);    
    if(!limite) return res.send(await productoMDB.getElements());
    let todos = await productoMDB.getElements();    
    let algunos = todos.slice(0, limite);
    res.send(await algunos);    
}) 

routerProd.get('/:id', async (req, res) => {
    let todos = await productoMDB.getElemtents();    
    let queProducto = todos.find(prod => prod.id === parseInt(req.params.id));
    res.send(await queProducto)
})

routerProd.delete('/:id', async (req, res) => {  
    await productoMDB.deleteElement(req.params.id);    
    res.send("Se registró la baja del producto");
})

routerProd.post('/', async (req, res) => {  
    await productoMDB.addElements(req.body)
    res.send("Producto creado");
})

routerProd.put('/:id', async (req, res) => {     
    await productoMDB.updateElementById(req.params.id, req.body)
    res.send("Producto Modificado");
})

export default routerProd;