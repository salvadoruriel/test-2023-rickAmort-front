import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Stack } from '@mui/material';

import router from './routes';

//All component & contents start from here
export default function App() {
	return (
		<Stack sx={{ width: '100%', height: '100%', overflow: 'visible' }}>
			{/* Header */}

			{/* Content/main: */}
			<RouterProvider router={router} />

			{/* Footer*/}
		</Stack>
	);
}