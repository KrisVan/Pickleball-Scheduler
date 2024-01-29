import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';

import UserContext from '../context/UserProvider';

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosFunction from '../hooks/useAxiosFunction';

export default function Admin() {
	const { user } = useContext(UserContext);
	const effectRan = useRef(false);

	const [users, setUsers] = useState();

	const axiosPrivate = useAxiosPrivate();
	const refresh = useRefreshToken();
	const [response, error, loading, axiosFetch] = useAxiosFunction();

	const getUsers = () => {
		axiosFetch({
			axiosInstance: axiosPrivate,
			method: 'GET',
			url: 'api/users',
		});
		console.log(response)
	}

	// not ran on mount
	useEffect (() => {
		if (effectRan.current === false) {
			getUsers();
		}
		return () => {
			effectRan.current = true;
		}
		// eslint-disable-next-line
	},[]);

	// Run after mount
	useEffect (() => {
		if (response?.length > 0) {
			setUsers(response);
		}
	},[response]);

	return(
			<div>
					<h2>Admin Page</h2>
					{user?.role && <b> Your role is {user.role} </b>}
					<br />
					<h2>Testing</h2>
					<button onClick={() => refresh()}>Refresh</button>
					<h2>Users</h2>
					<button onClick={() => getUsers()}>Get Users</button>
					<br />
					{loading && <b>Loading...</b>}
					{!loading && error && <b>Error, redirect to login: {error}</b>}
					{!loading && !error && response?.length && <p> {JSON.stringify(users)}</p>}
					{!loading && !error && !response && <b>No users</b>}

			</div>
	)
}
