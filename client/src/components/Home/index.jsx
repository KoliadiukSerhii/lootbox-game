import React from 'react';
import { useDispatch } from 'react-redux';

import { getTopUsers } from '../../helpers/userHelpers';

import Sidebar from '../Sidebar';
import PlayGround from '../Playground';

import classes from './style.module.scss';

const Home = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTopUsers());
    }, []);

    return (
        <div className={classes.main}>
            <div className={classes.main__left}>
                <Sidebar />
            </div>
            <div className={classes.main__right}>
                <PlayGround />
            </div>
        </div>
    );
}

export default Home;