export const config = {
  article: {
    TITLE_MAX_LENGTH: Number(process.env.ARTICLE_TITLE_MAX_LENGTH) || 75,
    TAGLINE_MAX_LENGTH: Number(process.env.ARTICLE_TAGLINE_MAX_LENGTH) || 150,
    DESCRIPTION_MAX_LENGTH:
      Number(process.env.ARTICLE_DESCRIPTION_MAX_LENGTH) || 300,
  },
  seo: {
    SITE_NAME: process.env.SITE_NAME || "Polkadot Developer Hub",
    twitter: {
      DEFAULT_SITE_USERNAME:
        process.env.TWITTER_DEFAULT_SITE_USERNAME || "@Polkadot",
      DEFAULT_CREATOR_USERNAME:
        process.env.TWITTER_DEFAULT_CREATOR_USERNAME || "@PolkadotDevs",
    },
    OG_IMAGE_DEFAULT: {
      logo: {
        path: "./src/assets/og/logomark-token-white.png",
        size: [150, 150],
      },
      bgGradient: [
        [230, 0, 122],
        [154, 0, 81],
      ],
      fonts: [
        "https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-400-normal.ttf",
        "https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-800-normal.ttf",
      ],
      font: {
        title: {
          families: ["Unbounded"],
          weight: "ExtraBold",
        },
        description: {
          families: ["Unbounded"],
          weight: "Normal",
        },
      },
    },
  },
  toc: {
    MIN_HEADING_LEVEL: Number(process.env.TOC_MIN_HEADING_LEVEL) || 2,
    MAX_HEADING_LEVEL: Number(process.env.TOC_MAX_HEADING_LEVEL) || 3,
  },
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
  cache: {
    github: {
      PATH: process.env.GITHUB_CACHE_PATH || "/tmp/cache/github",
      DATA_PATH_ROOT: process.env.GITHUB_CACHE_DATA_PATH_ROOT || "cache-github",
      TTL:
        Number(process.env.GITHUB_CACHE_TTL) ||
        Number(process.env.CACHES_TTL) ||
        60 * 5 * 1000, // 5 mins
    },
  },
}
