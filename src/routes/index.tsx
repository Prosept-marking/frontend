import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './root';

import ProtectedRoute from '../HOC/ProtectedRoute';
import { ProtectedRouteProps } from '../HOC/ProtectedRoute';
import Registration from '../pages/Registration/Registration';
import Login from '../pages/Login/Login';
import ErrorBoundary from './ErrorBoundary';
import Main from '../components/Main';

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: true,
  authenticationPath: '/signin',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route
        path="/"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={
              <>
                <Root />
              </>
            }
          />
        }
        errorElement={<ErrorBoundary />}
      >
        <Route path="/" element={<Main />} />
      </Route>
    </>,
  ),
);

export default router;
