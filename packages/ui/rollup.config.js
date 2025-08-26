import swc from '@rollup/plugin-swc'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import path from 'path'

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@schengen/calculator',
  'date-fns',
  'clsx',
  'class-variance-authority',
  'tailwind-merge',
  // Node.js built-ins that should not be bundled for browser
  'crypto',
  'events',
  'http',
  'https',
  'util',
  'child_process',
  'fs',
  'path',
  'os'
]

export default [
  // Type declarations build
  {
    input: 'src/types-only.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()],
    external
  },
  // ES modules build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          { find: '@', replacement: path.resolve('src') }
        ]
      }),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      postcss({
        extract: true,
        minimize: true,
        plugins: []
      }),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
          },
          target: 'es2022',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      })
    ],
    external
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
      peerDepsExternal(),
      alias({
        entries: [
          { find: '@', replacement: path.resolve('src') }
        ]
      }),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      postcss({
        extract: false,
        inject: true,
        minimize: true
      }),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
          },
          target: 'es2022',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      })
    ],
    external
  },
  // Minified UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'SchengenUI',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
        '@schengen/calculator': 'SchengenCalculator',
        'date-fns': 'dateFns',
        'clsx': 'clsx',
        'class-variance-authority': 'cva',
        'tailwind-merge': 'tailwindMerge'
      }
    },
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          { find: '@', replacement: path.resolve('src') }
        ]
      }),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      postcss({
        extract: false,
        inject: true,
        minimize: true
      }),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
          },
          target: 'es2022',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      }),
      terser()
    ],
    external
  }
]