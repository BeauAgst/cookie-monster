import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  typescript({
    resolveJsonModule: false,
  }),
  resolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser({
    sourcemap: false,
  }),
]

export default [
  {
    input: 'src/background.ts',
    output: {
      dir: 'dist',
    },
    plugins,
  },
  {
    input: 'src/content_script.ts',
    output: {
      dir: 'dist',
    },
    plugins,
  },
]
