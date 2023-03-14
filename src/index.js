
import 'dotenv/config'
import express from 'express';
import routerProd from './routes/products.js'
import routerCart from './routes/cart.js'
import routerUser from './routes/user.js'
import { __dirname } from './path.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server }  from 'socket.io'
import ProductManager from './dao/controllers/PManager.js'
import { getManagerMessage } from './dao/daoManager.js'
import mongoose from 'mongoose';

const listaprod = new ProductManager()

console.log(__dirname)

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})

const io = new Server(server)

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.engine("handlebars", engine()) //config hbs
app.set("view engine", "handlebars") // elementos
app.set("views", path.resolve(__dirname,  "./views")) //rutas

//CODIGO NUEVO 
/*
io.on("connection", async (socket) => {
    socket.on("messagee", async (info) => {
        const data = await getManagerMessage()
        const managerMsg = new data.ManagerMsgMongoDB
        managerMsg.addElements([info]).then((mensajes) => {
            managerMsg.getElements().then((mensajes) => {
                console.log(mensajes)
                socket.emit("allMessages", mensajes)
            })            
        })
    })
})
*/

//CODIGO ANTERIOR DE SOCKET.IO 

io.on("connection", (socket)=> {
    
    console.log("conexión con socket")    
    
    socket.on('mensaje', info => {
    console.log(info)
    })    
    
    socket.on('mi-envio', async info2 => {             
        await listaprod.addProduct(info2)        
        io.emit("publicar", info2)
        console.log(info2)
    })    

    socket.on('env-chat', async info3 => {
        console.log(info3)
    })

})

//connection mongoose - se iria ya que lo trabajamos en el .env
mongoose.connect('mongodb+srv://lucasmongodb01:coderhouse@cluster0.kaodtyu.mongodb.net/?retryWrites=true&w=majority')
.then(mensaje => console.log("MongoDB ATLAS conectado") )
.catch(error => console.log(error.mensaje))

//Routes

app.use('/api/product', routerProd)
app.use('/api/cart', routerCart)
app.use('/chat/user', routerUser)
app.use('/', express.static(__dirname + '/public'))
app.use('/realtimeproducts', express.static(__dirname + '/public'))
app.use('/chat', express.static(__dirname + '/public'))

//renderizado de productos
app.get('/', async (req,res) => {
    const productlist = await listaprod.getProduct() 
    res.render("home", {
       titulo: "CoderHouse-Home",
       productlist
    })
})

app.get('/realtimeproducts', async (req,res) => {
    const productlist2 = await listaprod.getProduct()
    res.render("realtimeproducts", {
       titulo: "CoderHouse-realTimeProducts",                             
       productlist2 
    })
})

app.get('/chat', async (req,res) => {
    res.render("chat", {
       titulo: "CoderHouse-chat",                             
    })
})
