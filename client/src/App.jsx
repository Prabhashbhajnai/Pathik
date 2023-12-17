import React from 'react'

// Components
import Navbar from './components/Navbar'
import Login from './components/user/Login'
import Notification from './components/Notification'
import Loading from './components/Loading'

const App = () => {
    return (
        <>
            <Loading />
            <Notification />
            <Login />
            <Navbar />
        </>
    )
}

export default App