import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://orataiphathai.work',
            lastModified: new Date(),
        },
        {
            url: 'https://orataiphathai.work/aboutus',
            lastModified: new Date(),
        },
        {
            url: 'https://orataiphathai.work/products/',
            lastModified: new Date(),
        },
        {
            url: 'https://orataiphathai.work/reviews',
            lastModified: new Date(),
        },
        {
            url: 'https://orataiphathai.work/terms',
            lastModified: new Date(),
        },
        {
            url: 'https://orataiphathai.work/privacy',
            lastModified: new Date(),
        },

    ];
}