
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Handle SPA fallback for client-side routing
    historyApiFallback: true,
  },
  plugins: [
    react({
      // Enable React 18 automatic JSX runtime
      jsxImportSource: 'react',
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base public path when served in production
  base: '/',
  // Handle static assets
  publicDir: 'public',
  // Configure the build output for SPA
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: {
          // Split react-markdown and related dependencies into a separate chunk
          'react-markdown': ['react-markdown', 'remark-gfm', 'rehype-raw'],
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  // For Vercel deployment
  define: {
    'process.env': {}
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-markdown',
      'remark-gfm',
      'rehype-raw',
    ],
  },
}));
