import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiLockedChest, GiOpenTreasureChest } from 'react-icons/gi';

import { getLootHistory } from '../../helpers/gameHelper';

import classes from './style.module.scss';

const lootColors = {
    legendary: 'var(--color-gold)',
    epic: 'var(--color-purple)',
    rare: 'var(--color-orange)',
    common: 'var(--color-skyblue)',
};

const PlayGround = () => {
    const socket = useSelector((state) => state.sockets.socket);
    const { currentUser } = useSelector((state) => state.users);
    const { lootHistory, chests, openedChests } = useSelector((state) => state.game);

    const dispatch = useDispatch();

    const handleChestClick = (chest) => {
        socket?.send(JSON.stringify({
            method: 'addChest',
            chest: chest,
            userId: currentUser.id
        }));
    };

    React.useEffect(() => {
        dispatch(getLootHistory());

        if (socket?.readyState === 1) {
            socket?.send(JSON.stringify({
                method: 'update'
            }));
        }
    }, [socket]);

    return (
        <React.Fragment>
            <h2 className={classes.grid__title}>
                Select a Chest with Loot
            </h2>
            {chests.length ? (
                <div className={classes.grid__container}>
                    {chests.map((chest) => (
                        <div
                            key={chest.id}
                            className={`${classes.grid__container_item} ${openedChests.includes(chest.id) ? chest.type  : ''}`}
                            onClick={() => handleChestClick(chest)}
                            style={{
                                boxShadow: openedChests.includes(chest.id) ? `inset 0 0 10px 5px ${lootColors[chest.type]}` : 'none',
                                pointerEvents: openedChests.includes(chest.id) ? 'none' : 'auto'
                            }}
                        >
                            {openedChests.includes(chest.id) ? (
                                <React.Fragment>
                                    <GiOpenTreasureChest />
                                    <p
                                        className={classes.grid__container_item_name}
                                        style={{ color: lootColors[chest.type] }}
                                    >
                                        {chest.name}
                                    </p>
                                </React.Fragment>
                            ) : (
                                <GiLockedChest />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className={classes.table__subtitle}>
                    There is no chests yet
                </h4>
            )}

            
            <h3 className={classes.table__title}>
                Loot History
            </h3>
            {lootHistory.length ? <div className={classes.table__container}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.table__cell}>Loot Name</th>
                            <th className={classes.table__cell}>Rarity</th>
                            <th className={classes.table__cell}>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lootHistory.map(({ id, name, type, username }) => (
                            <tr key={id}>
                                <td className={classes.table__cell}>{name}</td>
                                <td className={classes.table__cell} style={{ color: lootColors[type] }}>{type}</td>
                                <td className={classes.table__cell}>{username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : (
                <h4 className={classes.table__subtitle}>
                    There is no loot history yet
                </h4>
            )}
        </React.Fragment>
    );
}

export default PlayGround;