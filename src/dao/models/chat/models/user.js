import {Schema, model} from 'mongoose';

const userCollection = "messages" // nombre de la colección

const userSchema = new Schema({
    user: String,
    message: String    
    /* si quisiera un campo único:
    campo:{     
            Type: string,
            unique: true
          }
    */
}) 

export const userModel = model(userCollection, userSchema)
