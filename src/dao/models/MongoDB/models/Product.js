import { ManagerMongoDB } from '../../../../dao/db/mongoDBManager.js'

const productSchema = new Schema ({
    title: String, 
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: String,
    thumbnail: String  
})

