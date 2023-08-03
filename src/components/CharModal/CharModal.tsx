import React from 'react';
import { Avatar, Modal, Stack, Typography } from '@mui/material';
import { t_Character, t_Episode } from '../../types/api_types';
import Loader from '../Loader';
import rickAPI from '../../api/axiosConfig';
import getLastNumber from '../../utils/getLastNumber';

export type t_CharModal = {
	char: t_Character;
	onDismiss: () => void;
	isVisible?: boolean;
};

export const CharModal = (props: t_CharModal) => {
	const { char, onDismiss, isVisible = true } = props;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	//ignore since not all locations have a registered dimension
	//const [location, setLocation] = React.useState<t_Location>();
	const [episodes, setEpisodes] = React.useState<t_Episode[]>([]);

	if (!char) return null;

	//load episodes from server when a new char is to be displayed
	React.useEffect(() => {
		setIsLoading(true);

		const temp = char.episode.map((ep) => getLastNumber(ep));
		if (!temp) return;
		const eps = temp.length > 1 ? temp.join(',') : temp[0] + ',';

		rickAPI
			.get(`episode/${eps}`)
			.then((res: t_Episode[]) => {
				setEpisodes(res);
				console.log('episodes:', res);
			})
			.catch((err) => {
				console.error('[CharModal] error on getting characters:', err);
				setEpisodes([]);
			})
			.finally(() => setIsLoading(false));
	}, [char]);

	return (
		<Modal open={isVisible} onClose={onDismiss}>
			<Stack
				direction="row"
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					backgroundColor: 'rgb(48, 52, 54)',
					//
					width: '60%',
					height: '600px',
					maxHeight: '80%',
					//
					borderRadius: '8px',
					boxShadow: 20,
					overflow: 'hidden',
				}}
			>
				{isLoading && <Loader />}
				{/* Character info */}
				<Stack sx={{ height: '100%', flex: 2, maxWidth: '300px' }}>
					<Typography
						variant={'h4'}
						component="h3"
						sx={{ textAlign: 'center', background: 'rgb(28, 29, 38)' }}
					>
						{`${char.name}${char.status === 'Dead' ? ' †' : ''}`}
					</Typography>
					<Avatar
						variant="rounded"
						alt={char.name}
						src={char.image}
						sx={{
							height: 'auto',
							width: '100%',
							aspectRatio: 'auto',
						}}
					>
						{char.name}
					</Avatar>
					{/* Other info */}
					<Stack sx={{ p: '15px' }}>
						<Typography>
							<span>{`Status: `}</span>
							{char.status}
						</Typography>
						<Typography>
							<span>{`Species: `}</span>
							{char.species}
							{char.type ? ` - ${char.type}` : ''}
						</Typography>
						<Typography>
							<span>{`Gender: `}</span>
							{char.gender}
						</Typography>
					</Stack>
				</Stack>
				{/* Location & Episode info */}
				<Stack sx={{ height: '100%', flex: 3, p: '10px' }}>
					<Typography>
						<span>{`Last seen on:`}</span>
					</Typography>
					<Typography>{`${char.location.name || '???'}`}</Typography>

					{/* Episode lists: */}
					<Typography sx={{ pt: '20px' }}>
						<span>{`Seen in the following episodes:`}</span>
					</Typography>
					<Stack sx={{ overflow: 'auto', flex: 1, width: '100%' }}>
						{episodes.map((ep, idx) => (
							<Typography key={idx}>
								<span>{`${ep.episode}:`}</span> {ep.name}
							</Typography>
						))}
					</Stack>
				</Stack>
			</Stack>
		</Modal>
	);
};
