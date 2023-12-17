import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ passwordRef, id = 'password', label = 'Password' }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    // when clicked the visibility icon the focus stays on the password field
    const handleMouseDown = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <TextField
                autoFocus
                margin='normal'
                variant='standard'
                id={id}
                label={label}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                inputRef={passwordRef}
                inputProps={{ minLength: 6 }}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

export default PasswordField