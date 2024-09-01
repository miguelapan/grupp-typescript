import { createBrowserRouter } from 'react-router-dom';
import App from './App';  
import Home from './pages/Home';
import Help from './pages/Help';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  
    children: [
      {
        path: '/',  
        element: <Home />,
      },
      {
        path: '/help',
        element: <Help />,
      },
    ],
  },
]);

export default router;