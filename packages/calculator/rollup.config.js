import swc from '@rollup/plugin-swc'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

export default [
  // ES modules build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      commonjs(),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: false,
          },
          target: 'es2022',
        },
      })
    ],
    external: ['date-fns']
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      commonjs(),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: false,
          },
          target: 'es2022',
        },
        module: {
          type: 'commonjs',
        },
      })
    ],
    external: ['date-fns']
  },
  // Minified UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'SchengenCalculator',
      sourcemap: true,
      globals: {
        'date-fns': 'dateFns'
      }
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      commonjs(),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: false,
          },
          target: 'es2022',
        },
      }),
      terser()
    ],
    external: ['date-fns']
  },
  // TypeScript declarations
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()],
    external: ['date-fns']
  }
]