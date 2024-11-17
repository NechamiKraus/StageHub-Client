import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const PrivateRoute = ({ userName }) => {
    const location = useLocation();
    const role = location.pathname.split('/')[1]; // מוציא את החלק הראשון אחרי ה"/"
    if (!localStorage.getItem('userName') || localStorage.getItem('userRole') != role ) {
      // Redirect to SignIn with the current location (to redirect back after login)
      return <Navigate to={`/signin/${role}`} state={{ from: location }} />;

    }
  
    return <Outlet />;
  };
  

export default PrivateRoute