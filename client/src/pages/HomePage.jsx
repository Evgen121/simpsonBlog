import React from 'react'
import Posts from '../components/posts/Posts'
import { useEffect } from 'react'
import { useState } from 'react';

const HomePage = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            })
        })
    }, [])
    return (
        <>
            {posts.length > 0 && posts.map((post, index) => (
                <Posts {...post} key={index} />
            ))}
        </>
    )
}

export default HomePage
