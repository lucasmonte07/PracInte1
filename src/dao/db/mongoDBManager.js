import mongoose from 'mongoose';

export class ManagerMongoDB {
    
    #url // el # define un elemento privado
    constructor(url, collection, schema) {
        this.#url = url;
        this.collection = collection;
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema)
    }

    async #setConnection() {
        try {
            await mongoose.connect(this.#url)
            console.log("MongoDB connected")
        } catch(error) {
            console.log("Connection MongoDB failed", error)
            return error
        }
    }

    async getElements() {
        this.#setConecction()
        try {
            const elements = await this.model.find()
            return elements
        } catch(error) {
            console.log("Error en consulta de elementos MongoDB", error)
        }
    }

    async addElements(elements) {
        this.#setConecction()        
        try {
            const msgAdd = await this.model.insertMany(elements)            
            return msgAdd
        } catch(error) {
            console.log("Error al agregar elemento/s en MongoDB", error)
        }
    }

    async getElementsById(id) {
        this.#setConecction()        
        try {
            const element = await this.model.findById(id)
            return element
        } catch(error) {
            console.log("Error en consulta de elemento en MongoDB", error)
        }
    }

    async updateElementId(id, info) {
        this.#setConecction()        
        try {
            const msgUpdate = await this.findByIdAndUpdate(id, info)
            return msgUpdate
        } catch(error) {
            console.log("Error en Update de elemento en MongoDB", error)
        }
    }

    async deleteElement(id) {
        this.#setConecction()        
        try {
            const msgDelete = await this.model.findByIdAndRemove(id)
            return msgDelete
        } catch(error) {
            console.log("Error al eliminar elemento en MongoDB", error)
        }
    }
}