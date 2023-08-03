import React from 'react';
import { Stack, Typography } from '@mui/material';

import Loader from '../components/Loader';
import { t_Character, t_response } from '../types/api_types';
import rickAPI from '../api/axiosConfig';
import Carousel from '../components/Carousel';
import SearchInput from '../components/SearchInput';
import CharAvatar from '../components/CharAvatar';

export default function Home() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [chars, setChars] = React.useState<t_Character[]>();
	//searched vals
	const [searchVal, setSearchVal] = React.useState<string>('');
	const [foundChars, setFoundChars] = React.useState<t_Character[]>([]);

	//initial load for the Carousel
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

	//Search
	React.useEffect(() => {
		if (isLoading || !searchVal) return;
		setIsLoading(true);
		rickAPI
			.get(`character/?name=${searchVal}`)
			.then((res: t_response) => {
				setFoundChars(res.results as t_Character[]);
				console.log('found characters: ', res);
			})
			.catch((err) => {
				console.error('[Home] error on getting characters:', err);
				setFoundChars([]);
			})
			.finally(() => setIsLoading(false));
	}, [searchVal]);

	return (
		<Stack component="main" sx={{ alignItems: 'center', width: '100%', height: '100%' }}>
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
					{`Hello! This page is a simple searcher for characters from the series "Rick and morty"`}
				</Typography>
			</Stack>

			{/* Character carousel */}
			<Carousel chars={chars} sx={{ mt: '50px' }} />

			{/* Character searcher */}
			<Stack
				component="section"
				aria-label="Character searcher"
				sx={{
					width: '100%',
					flex: 1,
					background: 'rgb(19, 20, 29)',
					alignItems: 'center',
					pt: '20px',
				}}
			>
				<SearchInput
					onChange={setSearchVal}
					sx={{ width: '300px', maxWidth: '90%' }}
					label="Search a character"
				/>
				<Stack
					direction="row"
					sx={{
						width: '100%',
						height: '100%',
						maxHeight: '100%',
						background: 'rgb(23, 23, 32)',
						p: '20px',
						//overflow: 'auto',
						justifyContent: 'center',
						flex: 1,
						flexWrap: 'wrap',
						gap: '20px',
					}}
				>
					{!searchVal && <Typography>Try searching "rick"!</Typography>}
					{searchVal && !isLoading && foundChars.length === 0 && (
						<Typography>{`No matches found for "${searchVal}"`}</Typography>
					)}
					{searchVal &&
						!isLoading &&
						foundChars.map((char, idx) => (
							<CharAvatar
								key={idx}
								char={char}
								sx={{
									height: '200px',
									maxHeight: '48%',
									width: 'auto',
									aspectRatio: '1 / 1',
								}}
							/>
						))}
				</Stack>
			</Stack>
		</Stack>
	);
}
