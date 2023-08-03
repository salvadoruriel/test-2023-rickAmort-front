import { createTheme, responsiveFontSizes } from '@mui/material';

export const darkTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: 'dark',
		},
		typography: {
			fontSize: 18,
			h1: {
				fontWeight: 700,
			},
			h2: {
				fontWeight: 700,
			},
		},
		components: {
			MuiTypography: {
				styleOverrides: {
					root: {
						'& > span': {
							color: 'rgb(175, 165, 155)',
						},
					},
				},
			},
		},
	})
);
