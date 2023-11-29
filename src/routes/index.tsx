import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './root';

import ProtectedRoute from '../HOC/ProtectedRoute';
import { ProtectedRouteProps } from '../HOC/ProtectedRoute';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import ErrorBoundary from './ErrorBoundary';
import MainPage from '../pages/MainPage';
import Compare from '../pages/Compare';
import Statistics from '../pages/Statistics';

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
        <Route path="/" element={<MainPage />} />
        <Route path="/compare/" element={<Compare />} />
        <Route path="/compare/:id" element={<Compare />} />
        <Route path="/statistics" element={<Statistics />} />
      </Route>
    </>,
  ),
);

export default router;
