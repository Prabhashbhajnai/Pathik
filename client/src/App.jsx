import React from 'react'

// Components
import Navbar from './components/Navbar'
import Login from './components/user/Login'
import Notification from './components/Notification'
import Loading from './components/Loading'
import BottomNav from './components/BottomNav'

const App = () => {
    return (
        <>
            <Loading />
            <Notification />
            <Login />
            <Navbar />
            <BottomNav/>
        </>
    )
}

export default App