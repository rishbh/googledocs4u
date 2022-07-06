import mongoose from 'mongoose';
//username='RishabhJain',password='R2002Jain'
const Connection=async (URL)=>{



     try{
              await   mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
              console.log("Databse connected here successfully");
     }
     catch(error){
         console.log("Error while connecting ",error);
     }
}
//Databse connection


mongoose.connect(process.env.MONGO_CONNECTION_URL,{ useNewUrlParser: true,  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
console.log('Database connected...');
})
;

export default Connection;