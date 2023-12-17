import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, } from '@mui/material';
import { Close, Send } from '@mui/icons-material';

// Context
import { useValue } from '../../context/contextProvider'

// Components
import PasswordField from './PasswordField';
import GoogleOneTapLogin from './GoogleOneTapLogin';

const Login = () => {
    const { state: { openLogin }, dispatch } = useValue()
    // const [title, setTitle] = useState('Login')
    const [isRegister, setIsRegister] = useState(false)

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleClose = () => {
        dispatch({ type: 'CLOSE_LOGIN' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // useEffect(() => {
    //     isRegister ? setTitle('Register') : setTitle('Login')
    // }, [isRegister])

    return (
        <>
            <Dialog
                open={openLogin}
                onClose={handleClose}
            >
                <DialogTitle>
                    {!isRegister ? 'Login' : 'Register'}
                    {/* {title} */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <DialogContentText>
                            Please fill your details below
                        </DialogContentText>

                        {/* if registering the show the name field */}
                        {isRegister &&
                            <TextField
                                autoFocus
                                margin="normal"
                                variant="standard"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                inputRef={nameRef}
                                inputProps={{ minLength: 2 }}
                                required
                            />
                        }

                        {/* Email field */}
                        <TextField
                            autoFocus={!isRegister}
                            margin="normal"
                            variant="standard"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            inputRef={emailRef}
                            required
                        />

                        {/* Password Field */}
                        {/* Passing only ref other values will be default */}
                        <PasswordField {...{ passwordRef }} />

                        {/* If register confirm password field */}
                        {isRegister &&
                            <PasswordField
                                passwordRef={confirmPasswordRef}
                                id='confirmPassword'
                                label='Confirm Password'
                            />
                        }
                    </DialogContent>

                    {/* Submit Button */}
                    <DialogActions>
                        <Button type='submit' variant='contained' endIcon={<Send />}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>

                <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
                    {isRegister ? (
                        'Do you have an account? Sign in now'
                    ) : (
                        "Don't you have an account? Sign up now"
                    )}
                    <Button onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Login' : 'Register'}
                    </Button>
                </DialogActions>
                
                {/* Login with google */}
                <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
                    <GoogleOneTapLogin />
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Login