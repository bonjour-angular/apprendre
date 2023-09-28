import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/par-ou-commencer",
  },
  integrations: [
    starlight({
      title: "Bonjour Angular",
      logo: {
        src: "./src/assets/logo.webp",
      },
      favicon: "/public/favicon.png",
      customCss: ["./src/styles/index.css"],
      locales: {
        root: {
          label: "Français",
          lang: "fr-FR",
        },
      },
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        { label: "👋 Par où commencer ?", link: "/par-ou-commencer" },
        {
          label: "🚀 Formation Angular",
          autogenerate: { directory: "formations" },
        },
        {
          label: "🤔 C'est quoi ?",
          autogenerate: { directory: "cest-quoi" },
        },
        {
          label: "😎 Tips",
          autogenerate: { directory: "tips" },
        },
      ],
    }),
  ],
});
