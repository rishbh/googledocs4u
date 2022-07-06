import { StyledEngineProvider } from '@mui/material';
import {Server} from 'socket.io';
import express from 'express';

import {createServer} from 'http';
import {getDocument,updateDocument} from './controller/document-controller.js';
import Connection from './database/db.js';

//username='RishabhJain',password='R2002Jain'

const PORT=process.env.PORT || 9000;
const URL=process.env.MONGODB_URI || `mongodb://RishabhJain:R2002Jain@g-docs-shard-00-00.z6g5l.mongodb.net:27017,g-docs-shard-00-01.z6g5l.mongodb.net:27017,g-docs-shard-00-02.z6g5l.mongodb.net:27017/GOOGLEDOCCLONE?ssl=true&replicaSet=atlas-6fd2dq-shard-0&authSource=admin&retryWrites=true&w=majority`;//for connection

Connection(URL);
const app=express();
if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));


}

const httpServer=createServer(app);
httpServer.listen(app);


const io=new Server(http);

//making connection

io.on('connection',socket=>{
     socket.on('get-document',async documentID=>{
        const data="";

        const document=await getDocument(documentID);
        socket.join(documentID);        
        socket.emit('load-document',document.data);
        
        socket.on('send-changes',delta =>{
                    socket.broadcast.to(documentID).emit('receive-changes',delta);//for broadcasting changes to all users  
           
            })

            socket.on('save-document',async data=>{
                await updateDocument(documentID,data);
            })
     })
  
       
  
});







