import { useState, useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../userContext';
import "./header.css";

const Header = () => {
    const { setUserInfo, userInfo } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            });
        });
    }, [])

    function logout() {
        fetch('http://localhost:5000/logout', {
            credentials: 'include',
            method: 'POST',
        })

        setUserInfo(null)
    }


    const username = userInfo?.username;


    return (
        <header>
            <Link to='/' className='logo'>SimsonBlog</Link>

            <nav>
                {username && (
                    <>
                        <span> Hello {username}</span>
                        <button><Link to='/create'>Create new Post </Link></button>
                        <button><a onClick={logout} href="/">Logout</a></button>
                    </>

                )}
                {!username && (
                    <>
                        <button> <Link to='/login'>Login </Link></button>
                        <button> <Link to='/register'>Register</Link></button>
                    </>
                )}

            </nav>
        </header>
    )
}

export default Header
