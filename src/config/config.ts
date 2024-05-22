export const config = {
  article: {
    TITLE_MAX_LENGTH: Number(process.env.ARTICLE_TITLE_MAX_LENGTH) || 75,
    TAGLINE_MAX_LENGTH: Number(process.env.ARTICLE_TAGLINE_MAX_LENGTH) || 150,
    DESCRIPTION_MAX_LENGTH:
      Number(process.env.ARTICLE_DESCRIPTION_MAX_LENGTH) || 300,
  },
  toc: {
    MIN_HEADING_LEVEL: Number(process.env.TOC_MIN_HEADING_LEVEL) || 2,
    MAX_HEADING_LEVEL: Number(process.env.TOC_MAX_HEADING_LEVEL) || 3,
  },
}
