import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { AppContextProvider } from './contexts/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AppContextProvider>
		<App />
	</AppContextProvider>
);
