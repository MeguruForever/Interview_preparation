import path from 'path'
import { fileURLToPath } from 'url';
import commonjs  from "@rollup/plugin-commonjs"
import tsplugin from 'rollup-plugin-typescript2'

// 模拟 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    input: path.resolve(__dirname, 'src/index.ts'),
    output: {
        file: path.resolve(__dirname, 'dist/Vue.js'),
        format: 'umd',
        name: 'VueReactivity'
    },
    plugins: [
        commonjs(),
        tsplugin()
    ]
};