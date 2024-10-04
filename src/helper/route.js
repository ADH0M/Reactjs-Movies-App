import {createBrowserRouter} from 'react-router-dom';
import Products from '../services/products/Producs';
import ProductPage from '../services/products/ProductPage';
import Login from '../services/auth/Login';


const router = createBrowserRouter([
    {
        path:'/products',
        element:<Products/>
    },
    {
        path:'/',
        element:<Login/>
    },
    
    {
        path:'/product/:id',
        element:<ProductPage/>
    }

]);

export default router ;