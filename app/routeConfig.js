import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import Form from '@containers/Form';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  form: {
    component: Form,
    ...routeConstants.form
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
