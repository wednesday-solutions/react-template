import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import SongsContainer from './containers/SongsContainer/loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  songs: {
    component: SongsContainer,
    route: '/songs',
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
