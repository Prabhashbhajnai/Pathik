import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Box, IconButton, Typography, Button } from '@mui/material'
import { Menu, Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Context
import { useValue } from '../../context/ContextProvider'

// Components
import UserIcons from '../user/UserIcons'

const PoiNavbar = () => {
    const { state: { currentUser }, dispatch } = useValue()

    const navigate = useNavigate()

    return (
        <>
            <div>
                <>
                    <AppBar>
                        <Container maxWidth='lg'>
                            <Toolbar disableGutters>
                                <Typography
                                    variant='h6'
                                    component='h1'
                                    noWrap
                                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, cursor: 'pointer'}}
                                    onClick={() => navigate('/')}
                                >
                                    Pathik
                                </Typography>
                                <Typography
                                    variant='h6'
                                    component='h1'
                                    noWrap
                                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer'}}
                                    onClick={() => navigate('/')}
                                >
                                    Pathik
                                </Typography>

                                {/* if current user is logged in the show user icons else login button */}
                                {!currentUser ? (
                                    <Button
                                        color='inherit'
                                        startIcon={<Lock />}
                                        onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
                                    >
                                        Login
                                    </Button>
                                ) : (
                                    <UserIcons />
                                )}
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Toolbar />
                </>
            </div>
        </>
    )
}

export default PoiNavbar