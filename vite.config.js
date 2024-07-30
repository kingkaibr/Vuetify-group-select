import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'VuetifyMultiSelect',
      formats: ['es', 'umd'],
      fileName: (format) => `vuetify-multiselect.${format}.mjs`
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library
      external: ['vue', 'vuetify'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        }
      }
    }
  }
});
