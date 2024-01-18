// No arquivo de configuração de rotas
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Folder from './views/Folder';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/directory/:id",
        element: <Folder />
    }
]);

const Routers = () => (
    <RouterProvider router={router} />
);

export default Routers;
