import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pagesComp": "/src/components/pages",
      "@common": "/src/components/common",
      '@assets': "/src/assets/",
      '@data': "/src/assets/index",
      "@config": "/src/config",
      "@pages": "/src/pages/",
      "@layout": "/src/layout/",
      "@hooks": "/src/hooks/",
      "@utils": "/src/utils/",
      "@store": "/src/store/",
      "@api": "/src/api/",
    },
  },
})
