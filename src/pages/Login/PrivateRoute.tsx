import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../UserProvider';


const PrivateRoute = () => {
  const { isAuthenticated} = useUser();
  /*if (!isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }
  return <Route element={element} />;*/
  return isAuthenticated?<Outlet/>:<Navigate to={"login"}/>
};

export default PrivateRoute;


/*import { useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isUserAuthenticated ] = useState(true);
  const [hasUserRole ] = useState(true);

  return (
    <Route
      {...rest}
      element={
        isUserAuthenticated && hasUserRole ? (
          <Element />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;*/
