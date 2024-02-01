import React from 'react'

// Components
import Navbar from './components/Navbar'
import Login from './components/user/Login'
import Notification from './components/Notification'
import Loading from './components/Loading'
import BottomNav from './components/BottomNav'
import Room from './components/rooms/Room';

const App = () => {
    return (
        <>
            <Loading />
            <Notification />
            <Login />
            <Navbar />
            <BottomNav/>
            <Room/>
        </>
    )
}

export default App