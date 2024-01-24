import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Home() {
    const { user } = useContext(UserContext);

    return(
        <div>
            <h2>Home</h2>
            {user?.username && <b> Welcome {user.username} </b>}
        </div>
    )
}
