// src/app/sitemap.ts || app/sitemap.ts

import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NODE_ENV !== 'production') return [];

  return [
    {
      url: BASE_URL, //url
      lastModified: new Date(), //마지막수정일
      changeFrequency: 'yearly', //변경빈도
      priority: 1, //우선순위
    },
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
