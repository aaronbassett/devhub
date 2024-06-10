export const config = {
  disable: {
    LINK_VALIDATION:
      process.env.DISABLE_LINK_VALIDATION === "true" ? true : false,
  },
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
    remote_code: {
      PATH: process.env.REMOTE_CODE_CACHE_PATH || "/tmp/cache/remote-code",
      DATA_PATH_ROOT:
        process.env.REMOTE_CODE_CACHE_DATA_PATH_ROOT || "cache-remote-code",
      TTL:
        Number(process.env.REMOTE_CODE_CACHE_TTL) ||
        Number(process.env.CACHES_TTL) ||
        60 * 5 * 1000, // 5 mins
    },
  },
  socials: [
    {
      org: "Polkadot",
      icon: "networks/polkadot",
      links: [
        {
          name: "twitter",
          url: "https://twitter.com/Polkadot",
          icon: "mdi:twitter",
        },
        {
          name: "github",
          url: "https://github.com/paritytech/",
          icon: "mdi:github",
        },
        {
          name: "discord",
          url: "https://dot.li/discord",
          icon: "simple-icons:discord",
        },
        {
          name: "reddit",
          url: "https://www.reddit.com/r/polkadot/",
          icon: "mdi:reddit",
        },
        {
          name: "youtube",
          url: "https://www.youtube.com/channel/UCB7PbjuZLEba_znc7mEGNgw",
          icon: "mdi:youtube",
        },
        {
          name: "blog",
          url: "https://polkadot.network/blog/",
          icon: "mdi:blog",
        },
        {
          name: "newsletter",
          url: "https://share.hsforms.com/1LL1CBwiASxC5pJUYZAiDVw4752a",
          icon: "mdi:email-newsletter",
        },
      ],
    },
    {
      org: "Kusama",
      icon: "networks/kusama",
      links: [
        {
          name: "twitter",
          url: "https://twitter.com/kusamanetwork",
          icon: "mdi:twitter",
        },
        {
          name: "discord",
          url: "https://kusa.ma/discord",
          icon: "simple-icons:discord",
        },
        {
          name: "reddit",
          url: "https://www.reddit.com/r/Kusama",
          icon: "mdi:reddit",
        },
        {
          name: "youtube",
          url: "http://youtube.com/c/kusamanetwork",
          icon: "mdi:youtube",
        },
      ],
    },
    {
      org: "Web3 Foundation",
      icon: "brands/w3f",
      links: [
        {
          name: "twitter",
          url: "https://twitter.com/web3foundation",
          icon: "mdi:twitter",
        },
        {
          name: "github",
          url: "https://github.com/w3f",
          icon: "mdi:github",
        },
        {
          name: "medium",
          url: "https://medium.com/@web3",
          icon: "mdi:medium",
        },
        {
          name: "youtube",
          url: "https://www.youtube.com/channel/UClnw_bcNg4CAzF772qEtq4g",
          icon: "mdi:youtube",
        },
      ],
    },
    {
      org: "Developer Hub",
      icon: "networks/polkadot",
      links: [
        {
          name: "twitter",
          url: "https://twitter.com/PolkadotDevs",
          icon: "mdi:twitter",
        },
        {
          name: "github",
          url: "https://github.com/AcceleratePolkadot/",
          icon: "mdi:github",
        },
      ],
    },
  ],
  fetch: {
    RETRIES: Number(process.env.FETCH_RETRIES) || 3,
  },
}
