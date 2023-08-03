import React from 'react';
import { Stack, Typography } from '@mui/material';

import Loader from '../components/Loader';
import { t_Character, t_response } from '../types/api_types';
import rickAPI from '../api/axiosConfig';
import Carousel from '../components/Carousel';

export default function Home() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [chars, setChars] = React.useState<t_Character[]>();

	React.useEffect(() => {
		setIsLoading(true);
		rickAPI
			.get('character')
			.then((res: t_response) => {
				setChars(res.results as t_Character[]);
				console.log(res);
			})
			.catch((err) => {
				console.error('[Home] error on getting characters:', err);
			})
			.finally(() => setIsLoading(false));
	}, []);

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

			{/* Character carousel */}
			<Carousel chars={chars} sx={{ mt: '50px' }} />
		</Stack>
	);
}
