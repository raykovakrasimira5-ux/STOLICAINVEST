import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function estatePlusApiPlugin(): Plugin {
  return {
    name: 'estateplus-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/properties')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const forceRefresh =
              urlObj.searchParams.get('force') === 'true' ||
              urlObj.searchParams.get('sync') === 'true';

            const { getSynchronizedProperties } = await import('./src/services/estatePlusService');
            const result = await getSynchronizedProperties({ forceRefresh });

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = 200;
            res.end(JSON.stringify(result));
            return;
          } catch (err: any) {
            console.error('[Vite Estate Plus API error]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                error: err?.message || 'Internal error in Vite dev API proxy',
              })
            );
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), estatePlusApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
