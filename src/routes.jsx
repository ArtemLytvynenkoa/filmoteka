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
import { 
  CoreLayout,
  FilmDetails,
  FilmList, 
  SignIn, 
  SignUp, 
  TVDetails, 
  TVList, 
  UserLists, 
  UserProfile 
} from 'containers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'myFirebase';

export const routes = {
  public: {
    signInPage: {
      path: links.signInPage,
      component: SignIn,
    },
    signUpPage: {
      path: links.signUpPage,
      component: SignUp,
    },
    filmsPage: {
      path: links.filmsPage,
      component: FilmList,
      children: {
        customer: {
          path: '/:filmId',
          component: FilmDetails,
        },
      },
    },
    tvPage: {
      path: links.tvPage,
      component: TVList,
      children: {
        customer: {
          path: '/:tvId',
          component: TVDetails,
        },
      },
    },
  },
  private: {
    user: {
      path: links.userProfilePage,
      component: UserProfile,
    },
    userList: {
      path: links.userListPage,
      component: UserLists,
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

const getPublicRoutes = (routes, parentPath = '') => (
  Object
    .values(routes)
    .reduce((acc, { path, component: Component, children }) => {
      if (Component) {
        acc.push(
          <Route
            key={ parentPath ? `${parentPath}${path}` : path }
            path={ parentPath ? `${parentPath}${path}` : path }
            element={ <Component /> } 
          />,
        );
      }

      if (children) {
        return acc.concat(getPublicRoutes(children, `${parentPath}${path}`));
      }

      return acc;
    }, [])
);

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
          <Route path="*" element={ <FilmList /> } />
        </Routes>
      </CoreLayout>
    </Provider>
  </BrowserRouter>
);

export default AppRoutes;
