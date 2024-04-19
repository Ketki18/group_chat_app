/* * one to one + group chat functionality

*/
const express = require('express'); //here express.js file is being acess 
const http = require('http'); //can't use app.listen() directly need to use http module bcoz work with socketio  
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // creating instance of socketio handle socket input output

//connection 
io.on('connection', (socket) => { //socket is basically a client or user we r referring socket here 
    console.log('a user connected');

    socket.on('join group', ({ username, groupName }) => {
        console.log(`${username} joined group: ${groupName}`);
        socket.groupName = groupName;
        socket.join(groupName);
    });

    socket.on('leave group', ({ username, groupName }) => {
        console.log(`${username} left group: ${groupName}`);
        socket.leave(groupName);
    });

    socket.on('chat message', ({ sender, message }) => {
        const groupName = socket.groupName;
        io.to(groupName).emit('chat message', { sender, message }); //here just on recive a message client(i.e socket) server is brodcasting to group i.e to all sockets/users in group
        console.log(`${sender} sent message: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ......`);
});






// * 1 to 1 chat functionality 

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//         console.log('msg: ', msg)
//     });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} ......`);
// });
