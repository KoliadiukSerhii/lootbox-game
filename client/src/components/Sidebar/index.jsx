import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { GiTrophyCup } from "react-icons/gi";
import { MdLogout } from 'react-icons/md';

import { logout } from '../../state/actionCreaters';

import classes from './style.module.scss';

const Sidebar = () => {
    const { currentUser, topUsers, onlineUsers } = useSelector((state) => state.users);
    const socket = useSelector((state) => state.sockets.socket);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());

        socket?.send(JSON.stringify({
            username: currentUser.username,
            method: 'leave'
        }));
    }

    return (
        <div className={classes.container}>
            <div className={classes.container__top}>
                <p className={classes.container__top_title}>
                    Top players:
                </p>
                {topUsers.map((user, index) => (
                    <div key={user.username} className={classes.container__top_user}>
                        {index === 0 ? <GiTrophyCup color='var(--color-gold)' /> : null}
                        {index === 1 ? <GiTrophyCup color='var(--color-silver)' /> : null}
                        {index === 2 ? <GiTrophyCup color='var(--color-bronze)' /> : null}

                        <div>
                            <p className={classes.title}>{user.username}</p>
                            <p className={classes.description}>Wins: {user.winsCount}</p>
                        </div>

                        <p className={classes.container__top_user_status}>
                            {onlineUsers.includes(user.username) ? <span style={{ color: 'var(--color-light-green)' }}>Online</span> : <span style={{ color: 'var(--color-red)' }}>Offline</span>}
                        </p>
                    </div>
                ))}
            </div>
            <div className={classes.container__middle}>
                <button
                    className={classes.container__middle_button}
                    onClick={logoutHandler}
                >
                    <MdLogout />
                    Logout
                </button>
            </div>
            <div className={classes.container__bottom}>
                <FaUserCircle className={classes.container__bottom_icon} />
                <div>
                    <p className={classes.container__bottom_title}>
                        {currentUser.username}
                    </p>
                    <p className={classes.container__bottom_description}>
                        Wins: {currentUser.winsCount}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;