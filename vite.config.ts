import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import basicSsl from "@vitejs/plugin-basic-ssl"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), basicSsl(), tailwindcss()],
   resolve: { dedupe: ["three"] },
})
