import React, { useState } from 'react'
import { Box, IconButton, Badge, Tooltip, Avatar } from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'

// Context
import { useValue } from '../../context/ContextProvider'

// Hooks
import useCheckToken from '../../hooks/useCheckToken'

// Components
import UserMenu from './UserMenu'

const UserIcons = () => {
    useCheckToken()

    const { state: { currentUser } } = useValue()

    const [anchorUserMenu, setAnchorUserMenu] = useState(null)

    return (
        <>
            <Box>
                <IconButton size='large' color='inherit'>
                    <Badge color='error' badgeContent={5}>
                        <Mail />
                    </Badge>
                </IconButton>
                <IconButton size='large' color='inherit'>
                    <Badge color='error' badgeContent={20}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <Tooltip title='Open User Settings'>
                    <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                        <Avatar
                            src={currentUser?.photoUrl || currentUser?.photoURL}
                            alt='user'
                        >
                            {currentUser?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
            </Box>
        </>
    )
}

export default UserIcons