import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/commencez-par-ici",
  },
  integrations: [
    starlight({
      title: "Bonjour Angular",
      logo: {
        src: "./src/assets/logo.webp",
      },
      customCss: ["./src/styles/main.css"],
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
        { label: "👋 Commencez par ici", link: "/commencez-par-ici" },
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
