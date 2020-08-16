import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ITunesContainer from '@containers/ITunesContainer/Loadable';
import TuneContainer from '@containers/ITunesContainer/TuneInfo/index';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  iTunes: {
    component: ITunesContainer,
    ...routeConstants.iTunes
  },
  tune: {
    component: TuneContainer,
    ...routeConstants.tune
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
