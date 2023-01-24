import { useState } from 'react';
import "./register.css";

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function register(e) {
        e.preventDefault();


        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status === 200) {
            alert('Registration successful')
        } else {
            alert('registration failed')
        }


    }

    return (
        <form className='register' onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder='username'
                value={username}
                onChange={e => setUserName(e.target.value)} />
            <input type="password" placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}

export default Register
