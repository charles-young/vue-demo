const path = require('path');

module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    exclude: {
      path: 'node_modules|\\.test\\.ts|\\.spec\\.ts|\\.spec\\.vue',
    },
    tsPreCompilationDeps: false,
    tsConfig: {
      fileName: path.resolve(__dirname, 'tsconfig.app.json'),
    },
    enhancedResolveOptions: {
      extensions: ['.ts', '.js', '.vue'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+|src/(shared|entities|features|widgets|pages|app)/.*'
      },
    },
  },
  forbidden: [
    {
      name: 'no-cross-layer-imports',
      comment: 'Each layer should only import from lower layers',
      severity: 'error',
      from: {
        path: '^src/(features|widgets|pages|app)',
      },
      to: {
        path: '^src/shared',
        pathNot: '^src/shared',
      },
    },
  ],
};
