import { ManagerMongoDB } from '../../../../dao/db/mongoDBManager.js'

const msgSchema = new Schema ({
    user: {type: String, unique:true},
    message: String
})

export class ManagerMsgMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.MONGODBURL, "messages", msgSchema)
        //podriamos agregar aqui mas atributos propios a la clase extendida
    }
        //podriamos agregar aqui metodos propios a la clase extendida
}
