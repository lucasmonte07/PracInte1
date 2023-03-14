import { ManagerMongoDB } from '../../../../dao/db/mongoDBManager.js'

const cartSchema = new Schema ({
    productos: [
        {
            codprod: String, 
            quantify: Number
        }
    ] 
    
})