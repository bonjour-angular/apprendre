import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from "@astrojs/vercel/static";

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
      favicon: "favicon.png",
      customCss: ["./src/styles/index.css"],
      locales: {
        root: {
          label: "Français",
          lang: "fr-FR",
        },
      },
      tableOfContents: false,
      social: {
        github: "https://github.com/bonjour-angular",
        linkedin: "https://www.linkedin.com/in/kevin-tale/",
        twitter: "https://twitter.com/xKevinTale",
      },
      sidebar: [
        {
          label: "👋 Par où commencer ?",
          link: "/par-ou-commencer",
        },
        // {
        //   label: "🚀 Formation Angular",
        //   autogenerate: {
        //     directory: "formations",
        //   },
        //   collapsed: false,
        // },
        {
          label: "🤔 C'est quoi ?",
          autogenerate: {
            directory: "cest-quoi",
          },
          collapsed: false,
        },
        {
          label: "🎥 Videos",
          autogenerate: {
            directory: "videos",
          },
          collapsed: false,
        },
        {
          label: "📕 Articles",
          autogenerate: {
            directory: "articles",
          },
          collapsed: false,
        },
        {
          label: "😎 Bonnes pratiques",
          autogenerate: {
            directory: "best-practices",
          },
          collapsed: false,
        },
        {
          label: "🅰️ Angular changelog",
          autogenerate: {
            directory: "angular-change-log",
          },
          collapsed: false,
        },
      ],
      components: {
        MarkdownContent: "./src/components/Content.astro",
      },
    }),
  ],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
