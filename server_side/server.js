const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./Model/users');

const router = require('./Routes/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

let tablesArray = {}

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {

    console.log();
    let char = getUsersInRoom(room).length === 0 ? '/xUser.png' : '/circleUser.png';

    const { error, user } = addUser({ id: socket.id, name, room, char });

    if (error) return callback(error);

    socket.join(user.room);
    console.log(socket.id);

    socket.emit('message', { user: 'מנהל', text: `${user.name}, ברוכים הבאים לחדר ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: 'מנהל', text: `${user.name} הצטרף/ה` });

    tablesArray[user.room] === undefined ? tablesArray[user.room] = [0, 1, 2, 3, 4, 5, 6, 7, 8] : '';
    tablesArray[user.room] !== undefined && getUsersInRoom(room).length === 2 ? tablesArray[user.room] = [0, 1, 2, 3, 4, 5, 6, 7, 8] : ''
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      gameTable: tablesArray[user.room],
      char
    });

    callback();
  });
 
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('play', (index, callback) => {
    console.log(socket.id);

    const user = getUser(socket.id);
    console.log(user);

    console.log(tablesArray[user.room]);
    let table = tablesArray[user.room];
    let arrayIndex = 3 * index[0] + index[1];

    console.log(table[arrayIndex]);

    table[arrayIndex] = user.char;
    console.log(table[arrayIndex]);
    let gameOver = (table[0] === table[1] && table[1] === table[2]) ||
    (table[3] === table[4] && table[4] === table[5]) || (table[6] === table[7] && table[7] === table[8]) ||
    (table[0] === table[3] && table[3] === table[6]) || (table[1] === table[4] && table[4] === table[7]) ||
    (table[2] === table[5] && table[5] === table[8]) || (table[0] === table[4] && table[4] === table[8]) ||
    (table[2] === table[4] && table[4] === table[6]) ;
    
    io.to(user.room).emit('refreshTable', { user: user.name, table: table, gameOver });

    callback(table);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'מנהל', text: `${user.name} עזב/ה את החדר` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server run on port ${PORT}.`));