import React from 'react';
import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';

import { PASSWORD_VALIDATION, USERNAME_VALIDATION } from '../../config';

import classes from './style.module.scss';

const AuthForm = React.memo(({ buttonText, onSubmit }) => {
    const usernameRef = React.useRef('');
    const passwordRef = React.useRef('');

    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState({ username: false, password: false });

    const validate = () => {
        let isValid = true;

        if (!USERNAME_VALIDATION.test(usernameRef.current.value)) {
            setErrors((prevState) => ({
                ...prevState,
                username: true
            }));

            isValid = false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                username: false
            }));
        }

        if (!PASSWORD_VALIDATION.test(passwordRef.current.value)) {
            setErrors((prevState) => ({
                ...prevState,
                password: true
            }));

            isValid = false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                password: false
            }));
        }

        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSubmit({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            });
        }        
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className={classes.card__control}>
                <input
                    type='text'
                    ref={usernameRef}
                    placeholder='Username'
                    className={classes.card__control_input}
                    onChange={() => setErrors((prevState) => ({
                        ...prevState,
                        username: false
                    }))}
                />
                <FaUser className={classes.card__control_icon} />
                {errors.username ? <p className={classes.card__control_error}>Username must be at least 3 characters long</p> : null}
            </div>

            <div className={classes.card__control} style={{ marginTop: errors.username ? '8px' : '' }}>
                <input
                    ref={passwordRef}
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={() => setErrors((prevState) => ({
                        ...prevState,
                        password: false
                    }))}
                    className={classes.card__control_input}
                />
                {show
                    ? <FaLockOpen className={`${classes.card__control_icon} ${classes.clickable}`} onClick={() => setShow(false)} />
                    : <FaLock className={`${classes.card__control_icon} ${classes.clickable}`} onClick={() => setShow(true)} />
                }
                {errors.password ? <p className={classes.card__control_error}>Password must be at least 3 characters long and contain at least one uppercase letter</p> : null}
            </div>

            <button type='submit' className={classes.card__button} style={{ marginTop: errors.password ? '24px' : '' }}>
                {buttonText}
            </button>
        </form>
    );
});

export default AuthForm;