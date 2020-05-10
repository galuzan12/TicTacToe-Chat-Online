import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import '../../../Style/style.css';
import Input from '../../LoginComponents/Input/Input';
import Swal from 'sweetalert2';


const LoginPage = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleClick = (e) => {
        if (!name || !room){
            e.preventDefault();
            Swal.fire({
                title: 'oh!',
                text: 'All fields should be full',
                icon: 'warning',
                confirmButtonColor: 'rgb(157, 235, 255)',
            })
        }
    }

    return (
        <div className="container-fluid loginPage row">
            <div className="loginBox align-self-center">
                <Input type="text" name="name" placeHolder="הכנס שם" value={name} onChange={setName} />
                <Input type="text" name="room" placeHolder="הכנס חדר" value={room} onChange={setRoom} />
                <div className="col-12">
                    <Link
                        onClick={handleClick}
                        to={`/game?name=${name}&room=${room}`}
                    >
                        <button className='connectBtn btn btn-outline-info btn-block' type="submit">התחבר</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
