import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import SearchContainer from '@containers/SearchContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  search: {
    component: SearchContainer,
    ...routeConstants.search
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
