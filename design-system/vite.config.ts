import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        icons: 'src/icons.ts',
        'icons-12-filled': 'src/assets/Icon/12/Filled.tsx',
        'icons-16-stroked': 'src/assets/Icon/16/Stroked.tsx',
        'icons-20-stroked': 'src/assets/Icon/20/Stroked.tsx',
        'icons-24-stroked': 'src/assets/Icon/24/Stroked.tsx',
      },
      name: 'TDS',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'cjs' ? 'cjs' : 'es.js';
        const nameMap: Record<string, string> = {
          index: format === 'cjs' ? 't-ds.cjs' : 't-ds.es.js',
          icons: format === 'cjs' ? 'icons.cjs' : 'icons.es.js',
          'icons-12-filled': `icons/12/Filled.${ext}`,
          'icons-16-stroked': `icons/16/Stroked.${ext}`,
          'icons-20-stroked': `icons/20/Stroked.${ext}`,
          'icons-24-stroked': `icons/24/Stroked.${ext}`,
        };
        return nameMap[entryName] ?? `${entryName}.${ext}`;
      }
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
