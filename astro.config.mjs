import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://websiteURLexample.it", //edit website url
  vite: { plugins: [tailwindcss()] },
});
