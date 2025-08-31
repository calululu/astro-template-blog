import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

export default defineConfig({
  site: "https://websiteURLexample.it", //edit website url
  vite: { plugins: [tailwindcss()] },
  integrations: [
    // 👇 Update these lines
    sanity({
      projectId: "PROJECT-ID",
      dataset: "DATASET-NAME",
      useCdn: false, // for static builds
    }),
  ],
});
