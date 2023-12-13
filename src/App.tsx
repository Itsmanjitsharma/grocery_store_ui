import { createBrowserRouter, RouterProvider,Outlet, Navigate } from 'react-router-dom';
import Products from './pages/products/Products';
import Navbar from './components/navbar/Navbar';
import Menu from './components/Menu/Menu';
import Login from './pages/Login/Login';
import './styles/global.scss';
import Dashboard from './pages/home/Dashboard';
import Inventory from './pages/users/Inventory';
import InventorySummery from './pages/users/InventorySummery';
import BillingRetail from './pages/Billing/BillingRetail';
import BillingWholesale from './pages/Billing/BillingWholesale';
import BillingHistory from './pages/Billing/BillingHistory';
import { useUser } from './UserProvider';
import CustomerForm from './pages/home/CustomerForm';
import CustomerInfo from './pages/home/CustomerInfo';
import Admin from './components/Admin/Admin';

function PrivateRoute({ element, isAuthenticated, userRole, allowedRoles }) {
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

const Layout = ({userRole}) => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu role={userRole}/>
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const {isAuthenticated,userRole} = useUser();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },{
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Layout userRole={userRole}/>,
      children: [
        {
          path: '/dashboard',
          element: <PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} userRole={userRole}  allowedRoles={['admin']} />
        },
        {
          path: '/inventory',
          element: <PrivateRoute element={<Inventory />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']} />
        },
        {
          path: '/inventorySummery',
          element: <PrivateRoute element={<InventorySummery />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']} />
        },
        {
          path: '/billingRetail/:customerName',
          element: <PrivateRoute element={<BillingRetail />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin', 'user']} />
        },
        {
          path: '/billingWholesale/:customerName',
          element: <PrivateRoute element={<BillingWholesale />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin','user']} />
        },
        {
          path: '/billingHistory',
          element: <PrivateRoute element={<BillingHistory />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin', 'user']} />
        },{
          path: '/customer',
          element: <PrivateRoute element={<CustomerForm />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin', 'user']} />
        },{
          path: '/CustomerInfo/:customer_name',
          element: <PrivateRoute element={<CustomerInfo />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin', 'user']} />
        },
        {
          path: '/product/:productId',
          element: <PrivateRoute element={<Products />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']} />
        },
        {
          path: '/admin',
          element: <PrivateRoute element={<Admin />} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['admin']} />
        },
        {
          path: '*',
          element: <Outlet />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
