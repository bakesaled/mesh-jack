'use strict';

const ts = require('rollup-plugin-typescript');
const angular = require('rollup-plugin-angular');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const externalLibs = [
  '@angular/core',
  '@angular/common',
  'rxjs',
  'rxjs/operators',
];

module.exports = {
  input: './projects/bus/src/index.ts',
  output: {
    file: 'release/esm.js',
    format: 'esm',
  },
  external: externalLibs,
  plugins: [
    resolve({ modulesOnly: true }),
    commonjs(),
    angular({
      replace: false,
      preprocessors: {},
    }),
    ts({ target: 'ES5', module: 'ES6' }),
    // typescript({
    //   typescript: require('typescript'),
    //   tsconfig: 'tsconfig.json',
    // }),
  ],
};
