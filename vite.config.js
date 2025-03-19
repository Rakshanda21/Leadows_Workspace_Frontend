import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        port: 3000, // Set your desired port here
        open: true,
        allowedHosts: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Add JSX and TSX extensions
    },
    esbuild: {
        include: /\.(jsx|js|tsx|ts)$/, // Handle JSX and TSX files explicitly
        exclude: /node_modules/, // Skip node_modules for esbuild
        loader: "jsx", // Treat these as JSX
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx", // Treat .js as JSX
                ".ts": "tsx", // Treat .ts as TSX if needed
            },
        },
    },
    build: {
        target: "ES2022",
    },
});
