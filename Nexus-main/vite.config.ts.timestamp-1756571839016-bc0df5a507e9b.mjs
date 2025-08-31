// vite.config.ts
import { defineConfig } from "file:///C:/Users/jamsh/Downloads/Nexus-main%20(2)/Nexus-main%20(1)/Nexus-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jamsh/Downloads/Nexus-main%20(2)/Nexus-main%20(1)/Nexus-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "file:///C:/Users/jamsh/Downloads/Nexus-main%20(2)/Nexus-main%20(1)/Nexus-main/node_modules/fs-extra/lib/index.js";
var __vite_injected_original_dirname = "C:\\Users\\jamsh\\Downloads\\Nexus-main (2)\\Nexus-main (1)\\Nexus-main";
var copyStylesPlugin = () => {
  return {
    name: "copy-styles-plugin",
    closeBundle: async () => {
      const srcDir = resolve(__vite_injected_original_dirname, "src/styles");
      const destDir = resolve(__vite_injected_original_dirname, "dist/styles");
      await fs.copy(srcDir, destDir);
      console.log("\u2705 Styles directory copied to build output");
    }
  };
};
var vite_config_default = defineConfig({
  plugins: [react(), copyStylesPlugin()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          vendor: ["@heroicons/react", "lucide-react"]
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  server: {
    port: 3e3,
    strictPort: true
  },
  preview: {
    port: 3e3,
    strictPort: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqYW1zaFxcXFxEb3dubG9hZHNcXFxcTmV4dXMtbWFpbiAoMilcXFxcTmV4dXMtbWFpbiAoMSlcXFxcTmV4dXMtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcamFtc2hcXFxcRG93bmxvYWRzXFxcXE5leHVzLW1haW4gKDIpXFxcXE5leHVzLW1haW4gKDEpXFxcXE5leHVzLW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2phbXNoL0Rvd25sb2Fkcy9OZXh1cy1tYWluJTIwKDIpL05leHVzLW1haW4lMjAoMSkvTmV4dXMtbWFpbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG4vLyBDdXN0b20gcGx1Z2luIHRvIGNvcHkgc3R5bGVzIGRpcmVjdG9yeSB0byBidWlsZCBvdXRwdXRcbmNvbnN0IGNvcHlTdHlsZXNQbHVnaW4gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2NvcHktc3R5bGVzLXBsdWdpbicsXG4gICAgY2xvc2VCdW5kbGU6IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNyY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpO1xuICAgICAgY29uc3QgZGVzdERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC9zdHlsZXMnKTtcbiAgICAgIGF3YWl0IGZzLmNvcHkoc3JjRGlyLCBkZXN0RGlyKTtcbiAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgU3R5bGVzIGRpcmVjdG9yeSBjb3BpZWQgdG8gYnVpbGQgb3V0cHV0Jyk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGNvcHlTdHlsZXNQbHVnaW4oKV0sXG4gIGJhc2U6ICcvJyxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICB2ZW5kb3I6IFsnQGhlcm9pY29ucy9yZWFjdCcsICdsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WSxTQUFTLG9CQUFvQjtBQUNwYSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sUUFBUTtBQUhmLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sbUJBQW1CLE1BQU07QUFDN0IsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYSxZQUFZO0FBQ3ZCLFlBQU0sU0FBUyxRQUFRLGtDQUFXLFlBQVk7QUFDOUMsWUFBTSxVQUFVLFFBQVEsa0NBQVcsYUFBYTtBQUNoRCxZQUFNLEdBQUcsS0FBSyxRQUFRLE9BQU87QUFDN0IsY0FBUSxJQUFJLGdEQUEyQztBQUFBLElBQ3pEO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3JDLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLE9BQU8sQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDaEQsUUFBUSxDQUFDLG9CQUFvQixjQUFjO0FBQUEsUUFDN0M7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
