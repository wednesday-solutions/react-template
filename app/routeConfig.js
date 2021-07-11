import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import  SongContainer  from './containers/SongContainer/Loadable';
export const routeConfig = {
  repos: {
    component: SongContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
