import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <Navigate to={'/'} replace />,
		//children: [{ index: true, element: <Home /> }],
	},
]);
export default router;
