import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

// Context
import { useValue } from '../../context/ContextProvider'

const GoogleOneTapLogin = () => {
    const { dispatch } = useValue()
    const [disabled, setDisabled] = useState(false)

    const handleResponse = (response) => {
        const token = response.credential
        const decodedToken = jwtDecode(token)

        const { sub: id, email, name, picture: photoUrl } = decodedToken;

        dispatch({
            type: 'UPDATE_USER',
            payload: { id, email, name, photoUrl, token, google: true, roles: 'basic' }
        })
        dispatch({ type: 'CLOSE_LOGIN' });
    }

    const handleGoogleLogin = () => {
        setDisabled(true);
        try {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleResponse,
                use_fedcm_for_prompt: false,
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    throw new Error('Try to clear the cookies or try again later!');
                }
                if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
                    setDisabled(false);
                }
            })
        } catch (error) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: error.message },
            });
            console.log(error);
        }
    };

    return (
        <Button
            variant="outlined"
            startIcon={<Google />}
            disabled={disabled}
            onClick={handleGoogleLogin}
        >
            Login with Google
        </Button>
    );
};

export default GoogleOneTapLogin;