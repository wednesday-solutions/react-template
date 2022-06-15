import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ITunesContainer from './containers/ITunes/Loadable';
import TrackInfo from './containers/TrackInfo/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  tracks: {
    component: ITunesContainer,
    ...routeConstants.tracks
  },
  trackInfo: {
    component: TrackInfo,
    ...routeConstants.trackInfo
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
