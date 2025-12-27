// src/app/robots.ts || app/robots.ts

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*', //사용자에이전트
      allow: isProd ? '/' : '', //허용경로
      disallow: isProd ? '' : '/', //거부경로
    },
    sitemap: 'https://recodelog.com/sitemap.xml', //사이트맵파일경로
  };
}
