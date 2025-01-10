import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://study-typing.verccel.app/',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://study-typing.verccel.app/about',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: 'https://study-typing.verccel.app/ranking',
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
