module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      staticDistDir: './build',
      numberOfRuns: 2
    },
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'categories:performance': ['warn', { minScore: 0.95 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.95 }]
      }
    }
  }
};
