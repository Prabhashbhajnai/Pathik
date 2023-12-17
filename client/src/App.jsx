import React from 'react'

// Components
import Navbar from './components/Navbar'
import Login from './components/user/Login'
import Notification from './components/Notification'

const App = () => {
    return (
        <>
            <Notification />
            <Login />
            <Navbar />
        </>
    )
}

export default App