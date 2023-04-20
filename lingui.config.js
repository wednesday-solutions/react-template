module.exports = {
  fallbackLocales: {
    default: 'en'
  },
  sourceLocale: 'en',
  locales: ['en'],
  catalogs: [
    {
      path: 'app/translations/{locale}',
      include: ['app/**/!(*.test).js']
    }
  ],
  format: 'minimal'
};
