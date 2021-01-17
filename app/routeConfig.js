import NotFound from '@containers/NotFoundPage/Loadable';
import FrontendContainer from '@containers/FrontendContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  city: {
    component: FrontendContainer,
    ...routeConstants.city
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
