import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    route: '/',
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
