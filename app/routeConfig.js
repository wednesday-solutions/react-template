import NotFound from '@containers/NotFoundPage/Loadable';
import SongContainer from '@containers/SongContainer/Loadable';

export const routeConfig = {
  repos: {
    component: SongContainer,
    route: '/',
    // add props to pass to SongContainer
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
