import React, { FC } from 'react';
import { NavLink } from "react-router-dom";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/gratis-png-empresario-iconos-de-computadora-avatar-avatar.png";
import { UsersType } from '../types/types';

type PropsType = {
    user: UsersType,
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div key={user.id} >
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={styles.userPhoto}
                        />
                    </NavLink>

                </div>
                <div>
                    {user.followed
                        ? (<button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id);
                            }}>Unfollow</button>)
                        : (<button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id);
                            }}>Follow</button>)
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User