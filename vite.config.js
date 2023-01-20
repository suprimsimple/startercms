import { defineConfig } from 'vite'
import manifestSRI from 'vite-plugin-manifest-sri'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import ViteRestart from 'vite-plugin-restart'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    manifest: true,
    outDir: 'web/dist/',
    rollupOptions: {
      input: {
        app: 'src/js/app.js',
      },
      output: {
        sourcemap: true,
      },
    },
  },
  plugins: [
    manifestSRI(),
    viteCompression({
      filter: /\.(js|mjs|json|css|map)$/i,
    }),
    ViteRestart.default({
      reload: ['templates/**/*'],
    }),
  ],
  publicDir: path.resolve(__dirname, 'src/public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@js': path.resolve(__dirname, 'src/js'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
}))
