import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SongContainer from './containers/ItunesProvider/SongContainer/Loadable';
import DetailContainer from './containers/ItunesProvider/DetailContainer/Loadable';
import { HomeRoute } from './containers/ItunesProvider/SongContainer/index';
export const routeConfig = {
  home: {
    component: HomeRoute,
    route: '/',
    exact: true
  },
  repos: {
    component: SongContainer,
    ...routeConstants.tracks
  },
  track: {
    component: DetailContainer,
    ...routeConstants.track
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
