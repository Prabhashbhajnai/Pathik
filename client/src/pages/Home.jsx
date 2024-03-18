import React from 'react'

// Components
import Navbar from '../components/Navbar'
import Login from '../components/user/Login'
import BottomNav from '../components/BottomNav'

const Home = () => {
    return (
        <>
            <Login />
            <Navbar />
            <BottomNav/>
        </>
    )
}

export default Home