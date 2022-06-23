import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ItunesContainer from './containers/ItunesContainer/index';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itune,
    route: '/itunes'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
