import mongoose from 'mongoose';//for validating data comes in db

const documentSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    }
});
//model banaya
const document=mongoose.model('document',documentSchema);
export default document;