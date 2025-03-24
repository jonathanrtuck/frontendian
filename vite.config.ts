import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { type UserConfig } from "vite";

// https://vite.dev/config/
export default {
  build: {
    target: ["ES2023"],
  },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
} satisfies UserConfig;
