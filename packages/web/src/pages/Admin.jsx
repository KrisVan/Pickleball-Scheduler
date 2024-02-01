import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserProvider';
import useRefreshToken from "../hooks/useRefreshToken";
import UserDataTable from '../components/UserDataTable/UserDataTable';

export default function Admin() {
	const { user } = useContext(UserContext);
	const refresh = useRefreshToken();

	return(
			<div>
					<h2>Admin Page</h2>
					{user?.role && <b> Your role is {user.role} </b>}
					<br />
					<h2>Testing</h2>
					<button onClick={() => refresh()}>Refresh</button>
					<h2>Users</h2>
					<br />
					< UserDataTable />
			</div>
	)
}
