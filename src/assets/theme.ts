import { createTheme, responsiveFontSizes } from '@mui/material';

export const darkTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: 'dark',
		},
		typography: {
			fontSize: 18,
		},
		components: {
			MuiTypography: {
				styleOverrides: {
					root: {
						'& > span': {
							color: 'rgb(175, 165, 155)',
						}
					}
				}
			},
		},
	})
);
