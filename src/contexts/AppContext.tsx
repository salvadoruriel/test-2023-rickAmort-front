import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from '../assets/theme';

const AppContext = React.createContext({
	isDarkMode: false,
	toggleDarkMode: () => {},
});

/** App wide config's: theme */
export function AppContextProvider(props: any) {
	//we could have a lightTheme, but for this basic app we won't
	const [isDarkMode, setIsDarkMode] = React.useState<boolean>(true);
	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<AppContext.Provider
			value={{
				isDarkMode,
				toggleDarkMode,
			}}
		>
			<ThemeProvider theme={isDarkMode ? darkTheme : darkTheme}>
				<CssBaseline />
				{props.children}
			</ThemeProvider>
		</AppContext.Provider>
	);
}
export const useAppCtx = () => React.useContext(AppContext);
export default AppContext;
