import NotFound from '@containers/NotFoundPage/Loadable';
import WeatherContainer from '@containers/WeatherContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  city: {
    component: WeatherContainer,
    ...routeConstants.city
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
