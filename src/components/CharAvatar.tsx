import React from 'react';
import { t_Character } from '../types/api_types';
import { Avatar, AvatarProps } from '@mui/material';

export type t_CharAvatar = AvatarProps & {
	char: t_Character;
};
/**Styled character image displayer & Modal displayer */
export default function CharAvatar(props: t_CharAvatar) {
	const { char, sx, ...avatarProps } = props;

	if (!char) return null;
	return (
		<Avatar
			variant="rounded"
			alt={char.name}
			src={char.image}
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
	);
}
