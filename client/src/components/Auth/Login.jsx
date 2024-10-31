import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../helpers/authHelpers';

import AuthForm from './AuthForm';
import classes from './style.module.scss';

const Login = () => {
    const dispatch = useDispatch();

    const onSubmit = ({ username, password }) => {
        dispatch(login({ username, password }));
    }

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>
                Login
            </h2>

            <AuthForm
                buttonText='Login'
                onSubmit={onSubmit}
            />

            <div className={classes.card__footer}>
                <p>Don't have an account? <a href="/registration">Register</a></p>
            </div>
        </div>
    );
}

export default Login;