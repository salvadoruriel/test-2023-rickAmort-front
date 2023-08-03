import React from 'react';
import { t_Character } from '../types/api_types';
import { Avatar, AvatarProps } from '@mui/material';
import { CharModal } from './CharModal/CharModal';

export type t_CharAvatar = AvatarProps & {
	char: t_Character;
};
/**Styled character image displayer & Modal displayer */
export default function CharAvatar(props: t_CharAvatar) {
	const { char, sx, ...avatarProps } = props;
	const [isClicked, setIsClicked] = React.useState<boolean>(false);

	if (!char) return null;
	return (
		<>
			{isClicked && <CharModal char={char} onDismiss={() => setIsClicked(false)} />}
			<Avatar
				variant="rounded"
				alt={char.name}
				src={char.image}
				onClick={() => setIsClicked(true)}
				sx={{
					transition: 'transform 0.2s ease-in-out',
					'&:hover': {
						transform: 'scale(1.2)',
					},
					cursor: 'pointer',
					...sx,
				}}
				{...avatarProps}
			>
				{char.name}
			</Avatar>
		</>
	);
}
