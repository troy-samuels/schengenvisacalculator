import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { swc } from '@rollup/plugin-swc';
import dts from 'rollup-plugin-dts';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      swc({
        swc: {
          jsc: {
            target: 'es2020',
          },
        },
      }),
    ],
    external: ['stripe', '@stripe/stripe-js'],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      swc({
        swc: {
          jsc: {
            target: 'es2020',
          },
        },
      }),
    ],
    external: ['stripe', '@stripe/stripe-js'],
  },
  // TypeScript declarations
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];