import React from 'react';
import { Stack, Typography } from '@mui/material';

import Loader from '../components/Loader';

export default function Welcome() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	return (
		<Stack component="main" sx={{ alignItems: 'center' }}>
			{isLoading && <Loader />}
			{/* About the page */}
			<Stack
				component="section"
				aria-label="About this page"
				sx={{ gap: '40px', p: '20px', pt: '130px', alignItems: 'center' }}
			>
				<Typography variant="h2" component={'h1'} sx={{ textAlign: 'center' }}>
					{'Rick & Morty searcher'}
				</Typography>
				<Typography sx={{ maxWidth: '400px', textAlign: 'center' }}>
					{`Hello! This page is a simple searcher for characters, locations & episodes from the series "Rick and morty"`}
				</Typography>
			</Stack>

		</Stack>
	);
}
