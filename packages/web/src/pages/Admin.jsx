import React from 'react';
import { useContext } from 'react';

import { Typography } from '@mui/material';
import { Box } from '@mui/material';

import UserContext from '../context/UserProvider';
import UserDataTable from '../components/UserDataTable/UserDataTable';

export default function Admin() {
	const { user } = useContext(UserContext);

	return(
			<Box
				sx={{
					bgcolor: 'background.paper',
					boxShadow: 1,
					borderRadius: 2,
					p: 2,
					minWidth: 300,
				}}
			>
				<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
				>
					Dashboard
				</Typography>
				{user?.role && 
				<Typography
					variant="subtitle1"
					color="inherit"
				>
					Your role is {user.role}
				</Typography>
				}
				<UserDataTable />
			</Box>
	)
}
