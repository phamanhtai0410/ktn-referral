import { defineConfig ,loadEnv } from 'vite'
// import vitApp from '@vitjs/vit'
import { join } from 'path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import autoImport from 'unplugin-auto-import/vite'
import windiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const production = process.env.NODE_ENV === 'production'

const resolve = (dir: string) => join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

    return{
     
      define: {
        __APP_ENV__: env.APP_ENV
      },
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
    
      server: {
        host: "0.0.0.0",
        port: 3000
      },
      build: {
        target: 'es2015',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true, // 所有console
            // pure_funcs: ['console.log'], // 单独指定
            drop_debugger: true,
          },
        },
        rollupOptions: {
          plugins: [nodePolyfills()],
        },
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        /* 如需分包时开启 */
        /*
        rollupOptions: {
          output: {
            // 方式-1:所有依赖都分包
            // manualChunks(id) {
            //   if (id.includes('node_modules'))
            //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // },
            // 方式-2:只对大的依赖分包
            manualChunks: {
              vant: ['vant'], // 要分包的依赖
            },
          },
        }, */
      },

      plugins: [
        react({
          babel: {
            parserOpts: {
              plugins: ['decorators-legacy'],
            },
          },
        }),
        tsconfigPaths(),
        autoImport({
          imports: [
            'react',
            {
              react: [
                'createElement',
                'cloneElement',
                'createContext',
                // 'useLayoutEffect',
                // 'forwardRef',
              ],
            },
          ],
        }),
        // vitApp({
        //   routes,
        //   dynamicImport: {
        //     loading: './components/PageLoading',
        //   },
        //   exportStatic: {},
        // }),
        windiCSS(),
        visualizer(),
        !production && mode === "development" && nodePolyfills({
            include: [
              'node_modules/**/*.js',
              new RegExp('node_modules/.vite/.*js'),
            ],
        }),
          
      ]
    }

})
