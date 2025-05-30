import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import ITunesSearch from '@app/containers/ITunesSearch/loadable';

export const routeConfig = {
  itunes: {
    component: ITunesSearch,
    ...routeConstants.itunes
  },
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
