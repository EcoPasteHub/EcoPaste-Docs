import { join } from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: join(__dirname, "docs"),
  title: "EcoPaste",
  description: "Cross-platform clipboard management tool",
  icon: "/icon.png",
  logo: {
    light: "/light-logo.png",
    dark: "/dark-logo.png",
  },
  themeConfig: {
    enableContentAnimation: true,
    enableAppearanceAnimation: true,
    searchPlaceholderText: "搜索",
    searchNoResultsText: "未搜索到相关结果",
    searchSuggestedQueryText: "可更换不同的关键字后重试",
    lastUpdated: true,
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/EcoPasteHub/EcoPaste",
      },
    ],
  },
  globalStyles: join(__dirname, "styles", "index.css"),
});
