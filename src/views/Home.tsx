import React from 'react';
import { Stack, Typography } from '@mui/material';

import Loader from '../components/Loader';

export default function Welcome() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	return (
		<Stack component="main" sx={{ alignItems: 'center' }}>
			{isLoading && <Loader />}
			{/* About the page */}
			<Stack component="section" aria-label="About this page" sx={{ gap: '10px', pt: '30px' }}>
				<Typography variant="h4" component={'h1'} sx={{ pt: '100px', textAlign: 'center' }}>
					{'Rick & Morty searcher'}
				</Typography>
			</Stack>
		</Stack>
	);
}
