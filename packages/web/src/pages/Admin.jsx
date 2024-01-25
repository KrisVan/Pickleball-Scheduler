import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Admin() {
    const { user } = useContext(UserContext);

    return(
        <div>
            <h2>Admin Page</h2>
            {user?.role && <b> Your role is {user.role} </b>}
        </div>
    )
}
