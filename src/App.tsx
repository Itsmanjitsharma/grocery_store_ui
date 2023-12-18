import { createBrowserRouter, RouterProvider, Outlet, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
function PrivateRoute({ element, isAuthenticated, userRole, allowedRoles }) {
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return element;
  } else {
    isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    userRole = localStorage.getItem('role');
    if (isAuthenticated && allowedRoles.includes(userRole)) {
      return element;
    }else{
    return <Navigate to="/login" />;
    }
  }
}

const Layout = ({ userRole }) => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu role={userRole} />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const { isAuthenticated: userIsAuthenticated, userRole: userUserRole } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(userIsAuthenticated);
  const [userRole, setUserRole] = useState(userUserRole);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedRole = localStorage.getItem('role');
    
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
      setUserRole(storedRole || 'defaultRole');
    } else {
      setIsAuthenticated(false);
      setUserRole('defaultRole'); 
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Layout userRole={userRole} />}
        >
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<Dashboard />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute
                element={<Inventory />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/inventorySummery"
            element={
              <PrivateRoute
                element={<InventorySummery />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/billingRetail/:customerName"
            element={
              <PrivateRoute
                element={<BillingRetail />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/billingWholesale/:customerName"
            element={
              <PrivateRoute
                element={<BillingWholesale />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/billingHistory"
            element={
              <PrivateRoute
                element={<BillingHistory />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/customer"
            element={
              <PrivateRoute
                element={<CustomerForm />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/CustomerInfo/:customer_name"
            element={
              <PrivateRoute
                element={<CustomerInfo />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/product/:productId"
            element={
              <PrivateRoute
                element={<Products />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={['admin']}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
