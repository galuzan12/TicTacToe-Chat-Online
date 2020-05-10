import { createContext } from 'react';
import io from "socket.io-client";


let ENDPOINT = 'http://localhost:5000';

export const GameContext = createContext({
    name: '',
    setName: '',
    room: '',
    setRoom: () => {},
    users: [],
    setUsers:  () => {},
    messages: [],
    setMessages: () => {},
    ENDPOINT: 'https://react-xo-chat.herokuapp.com/',
    socket: io(ENDPOINT),
    table: [1,2,3,4,5,6,7,8,9],
    clicked: [false, false, false, false, false, false, false, false, false],
    gameChat: process.env.PUBLIC_URL + '/xUser.png',
    setClicked: () => {},
    setTable: () => {},
    turn: true,
    setTurn: () => {},
    gameOver: false,
    setGameOver: () => {},
    play: () => {},

})