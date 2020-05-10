import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './GamePage.css';
import Table from '../../GameComponents/Table/Table';
import Chat from '../../ChatComponents/Chat/Chat';
import { GameContext } from '../../../Context/GameContext';
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const GamePage = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [table, setTable] = useState([]);
    const [clicked, setClicked] = useState([]);
    const [gameChar, setGameChar] = useState(process.env.PUBLIC_URL + '/xUser.png');
    const [turn, setTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const ENDPOINT = 'https://react-xo-chat.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);
        console.log(turn);


        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    const loadTable = (gameTable) => {
        console.log(gameTable);
        console.log(users);
        console.log(table);

        setTable(
            gameTable.map(
                (val, index) =>
                    table[index] !== gameTable[index] ?
                        table[index] = gameTable[index] :
                        table[index] = gameTable[index]
            )
        );
        setClicked(
            gameTable.map(
                (val, index) =>
                    !Number.isInteger(table[index]) ? clicked[index] = true : clicked[index] = false
            )
        );
    }

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users, gameTable, char }) => {
            setUsers(users);
            loadTable(gameTable);
            setGameChar(char);
            console.log(char);
        });
        socket.on('refreshTable', ({ user, table, gameOver }) => {
            setGameOver(gameOver);
            loadTable(table);
            const { name } = queryString.parse(location.search);
            console.log(turn);

            user === name ? setTurn(false) : setTurn(true);
            console.log(turn);

        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const play = async (index) => {
        await socket.emit('play', index, (gameTable) => {
            //loadTable(gameTable);
        });
    }

    const startNewGame = () => {
        // setGameOver(false);
        window.location.reload();
    }

    let contextObj = {
        name: name,
        setName: setName,
        room: room,
        setRoom: setRoom,
        users: users,
        setUsers: setUsers,
        messages: messages,
        setMessages: setMessages,
        table: table,
        setTable: setTable,
        socket: socket,
        turn,
        ENDPOINT: ENDPOINT,
        play: play,
        gameChar: gameChar,
        clicked
    };

    return (
        <GameContext.Provider value={contextObj}>
            <React.Fragment>
                {gameOver && <div className="gameOverDiv col-md-6">
                   
                    <Link
                        to={`/`}
                    >
                        <button className="newGameBtn btn btn-warning btn-lg btn-block">משחק חדש</button>
                    </Link>
               
                </div>}
                <div className="row gamePage">
                    <div className="game col-md-6">
                            <Table />
                      
                    </div>
                    <div className="chat col-md-6">
                        <Chat setMessage={setMessage} message={message} sendMessage={sendMessage} />
                    </div>
                </div>
            </React.Fragment>
        </GameContext.Provider>
    )
}

export default GamePage;
