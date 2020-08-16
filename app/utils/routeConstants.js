export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  iTunes: {
    route: '/tunes',
    props: {
      maxwidth: 800,
      padding: 20
    }
  },
  tune: {
    route: '/tune/:tuneId'
  }
};
