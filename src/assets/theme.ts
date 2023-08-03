import { createTheme, responsiveFontSizes } from '@mui/material';

export const darkTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: 'dark',
		},
	})
);
