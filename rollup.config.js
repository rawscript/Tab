import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'TabAuth',
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named',
      globals: {
        'crypto-js': 'CryptoJS',
        'localforage': 'localforage'
      }
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      }),
      commonjs(),
      isProduction && terser()
    ].filter(Boolean),
    external: ['crypto-js', 'localforage']
  },
  
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      }),
      commonjs(),
      isProduction && terser()
    ].filter(Boolean),
    external: ['crypto-js', 'localforage', 'node-fetch']
  },
  
  // ES module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      }),
      commonjs(),
      isProduction && terser()
    ].filter(Boolean),
    external: ['crypto-js', 'localforage', 'node-fetch']
  },
  
  // React-specific build
  {
    input: 'src/react/AuthProvider.js',
    output: {
      file: 'dist/react.js',
      format: 'es',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env', '@babel/preset-react']
      }),
      commonjs(),
      isProduction && terser()
    ].filter(Boolean),
    external: ['react', 'crypto-js', 'localforage', 'node-fetch']
  }
];