import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store }  from 'redux/store';
import links from 'links';
import { CoreLayout } from 'containers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'myFirebase';
import { 
  FilmsPage, 
  SignInPage, 
  SignUpPage, 
  UserProfilePage
} from 'pages';

export const routes = {
  public: {
    signInPage: {
      path: links.signInPage,
      component: SignInPage,
    },
    signUpPage: {
      path: links.signUpPage,
      component: SignUpPage,
    },
    filmsPage: {
      path: links.filmsPage,
      component: FilmsPage,
    },
  },
  private: {
    user: {
      path: links.userProfilePage,
      component: UserProfilePage,
    },
  },
};

const PrivateRoute = ({ component: Component }) => {
  const [user] = useAuthState(auth);

  if (user) {
    return <Component />;
  }

  return <Navigate to={ links.signIn } />;
};

const getPublicRoutes = routes => Object
  .values(routes)
  .map(({ path, component: Component }) => (
    Component &&
    <Route
      key={ path }
      path={ path }
      element={ <Component /> }
    />
  ));

const getPrivateRoutes = (routes, parentPath = '') => (
  Object
    .values(routes)
    .reduce((acc, { path, component, children }) => {
      if (component) {
        acc.push(
          <Route
            key={ parentPath ? `${parentPath}${path}` : path }
            path={ parentPath ? `${parentPath}${path}` : path }
            element={ <PrivateRoute component={ component } /> }
          />,
        );
      }

      if (children) {
        return acc.concat(getPrivateRoutes(children, `${parentPath}${path}`));
      }

      return acc;
    }, [])
);

const AppRoutes = () => (
  <BrowserRouter>
    <Provider store={ store }>
      <CoreLayout>
        <Routes>
          { getPublicRoutes(routes.public) }
          { getPrivateRoutes(routes.private) }
          <Route path="*" element={ <FilmsPage /> } />
        </Routes>
      </CoreLayout>
    </Provider>
  </BrowserRouter>
);

export default AppRoutes;
