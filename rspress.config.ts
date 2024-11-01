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
    lastUpdated: true,
    searchPlaceholderText: "搜索",
    searchNoResultsText: "未搜索到相关结果",
    searchSuggestedQueryText: "可更换不同的关键字后重试",
    lastUpdatedText: "最后更新时间",
    prevPageText: "上一篇",
    nextPageText: "下一篇",
    outlineTitle: "页面导航",
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/EcoPasteHub/EcoPaste",
      },
    ],
    editLink: {
      docRepoBaseUrl:
        "https://github.com/EcoPasteHub/EcoPaste-Docs/tree/master/docs",
      text: "📝 在 GitHub 上编辑此页",
    },
  },
  markdown: {
    mdxRs: false,
    globalComponents: [
      join(__dirname, "src", "components", "Image"),
      join(__dirname, "src", "components", "Link"),
      join(__dirname, "src", "components", "Download"),
    ],
  },
  globalStyles: join(__dirname, "src", "styles", "global.scss"),
});
