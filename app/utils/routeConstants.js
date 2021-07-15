export default {
  tracks: {
    route: '/tracks',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  track: {
    route: '/tracks/:trackId',
    props: {
      maxwidth: 500,
      padding: 20
    }
  }
};
