import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
    return defineConfig({
        plugins: [vue()],
        server: {
            host: true,
            port: 8080,
        },
        build: {
            emptyOutDir: true,
        },
    })
}