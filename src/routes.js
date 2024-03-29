import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import CultivationsPage from './pages/Cultivations';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import MyProductsPage from './pages/MyProducts';
import DashboardAppPage from './pages/DashboardAppPage';
import CropAdd from './pages/Crops';
import Auction from './pages/Auction';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'cultivations', element: <CultivationsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'my-products', element: <MyProductsPage /> },
        { path: 'help', element: <BlogPage /> },
        { path: 'crop-manager', element: <CropAdd /> },
        { path: 'auction', element: <Auction /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
