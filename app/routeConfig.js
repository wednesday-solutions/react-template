import NotFound from '@containers/NotFoundPage/loadable';
import HomeContainer from '@containers/HomeContainer/loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
