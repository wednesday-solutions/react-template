export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  tracks: {
    route: '/tracks',
    exact: true
  },
  trackInfo: {
    route: '/tracks/:id',
    exact: true
  }
};
