import React from 'react'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import { useValue } from '../../context/contextProvider'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    const { dispatch } = useValue()

    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }

    return (
        <>
            <Menu
                anchorEl={anchorUserMenu}
                open={Boolean(anchorUserMenu)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu