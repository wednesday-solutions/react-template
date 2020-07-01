import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ItuneAppContainer from '@containers/ItunesAppContainer/Loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  ituneapp: {
    component: ItuneAppContainer,
    route: '/itunes',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
