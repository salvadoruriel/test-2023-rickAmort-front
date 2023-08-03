import React from 'react';
import { t_Character } from '../types/api_types';
import { Avatar, AvatarProps } from '@mui/material';

export type t_CharAvatar = AvatarProps & {
	char: t_Character;
};
/**Styled character image displayer & Modal displayer */
export default function CharAvatar(props: t_CharAvatar) {
	const { char, ...avatarProps } = props;

	if (!char) return null;
	return (
		<Avatar variant="rounded" alt={char.name} src={char.image} {...avatarProps}>
			{char.name}
		</Avatar>
	);
}
