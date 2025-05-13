    const express=require("express");
    const cors = require("cors");

    const app=express();
    const http =require("http")
    const path=require("path");
    const{Server}=require("socket.io")
    app.use(cors());
    const server=http.createServer(app);
    const io=new Server(server,{
        cors: {
            origin: "heroic-fairy-60c220.netlify.app", 
            methods: ["GET", "POST"]
          }
    })
    // http://localhost:5173

    let users = {};
    console.log("user",users);


    //socket.io
    io.on("connection",(socket)=>{
    console.log('a new user has connected',socket.id);
    socket.emit('welcome', 'Welcome to the chat!');


    socket.on('register', (username) => {
        users[username] = socket.id;
        console.log('Registered:', username, socket.id);
        console.log("usrs",users);


        setTimeout(() => {
            // If user is still active, we send the timeout message
            if (users[username]) {
            socket.emit('sessionExpired', 'Your session has expired due to inactivity.');
            socket.disconnect();
            console.log(`${username}'s session expired`);
            }
        }, 600000000 );
    });
    console.log("usrs",users);


    //client se msg receive krke dusre clients ko bhejrahah he
    socket.on('sendMessage', (msg) => {
        //socket.broadcast.emit('sendMessage',msg)        //this is to send msg all
        console.log(msg,"msg");
        
        let recipientSocketId = users[msg.recipient];
        console.log("recipent",recipientSocketId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('sendMessage', msg);
        }
        }); 
    })

    // app.use(express.static(path.resolve("./public")))
    // app.get("/",(req,res)=>{
    // return   res.sendFile("/public/index.html")
    // })



    server.listen(1010,()=>{
        console.log(1010,"server is connect");
        
    })