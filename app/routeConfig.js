import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SongContainer from './containers/ItunesProvider/SongContainer/Loadable';
import DetailContainer from './containers/ItunesProvider/DetailContainer/Loadable';
import HomeContainer from './containers/HomeContainer/Loadable';

export const routeConfig = {
  home: {
    component: HomeContainer,
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
