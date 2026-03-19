import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: './', 
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        nosotros: resolve('pages/nosotros.html'),
        servicios: resolve('pages/servicios.html'),
        portafolio: resolve('pages/portafolio.html'),
        clientes: resolve('pages/clientes.html'),
        contacto: resolve('pages/contacto.html'),
        testimonios: resolve('pages/testimonios.html'),
        activaciones: resolve('pages/activaciones.html'),
        'material-pop': resolve('pages/material-pop.html'),
        merchandising: resolve('pages/merchandising.html')
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve('partials'),
    }),
  ],
});
