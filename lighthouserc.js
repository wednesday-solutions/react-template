module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: ['http://localhost:3000']
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
