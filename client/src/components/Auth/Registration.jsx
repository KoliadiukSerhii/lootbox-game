import React from 'react';
import { useDispatch } from 'react-redux';

import { registration } from '../../helpers/authHelpers';

import AuthForm from './AuthForm';
import classes from './style.module.scss';

const Registration = () => {
    const dispatch = useDispatch();

    const onSubmit = ({ username, password }) => {
        dispatch(registration({ username, password }));
    }

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>
                Registration
            </h2>

            <AuthForm
                buttonText='Register'
                onSubmit={onSubmit}
            />

            <div className={classes.card__footer}>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default Registration;