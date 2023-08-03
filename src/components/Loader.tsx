import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';

type t_Loader = {
	open?: boolean;
};

/**FUllscreen loading icon */
export default function Loader(props: t_Loader) {
	const { open = true } = props;
	if (!open) return null;

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={open}
			onClick={(e) => e.preventDefault()}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
