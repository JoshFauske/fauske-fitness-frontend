export function getStrapiMedia(media) {
  if (media.url == null) {
    return null
  }

  // Return the full URL if the media is hosted on an external provider
  if (media.url.startsWith("http") || media.url.startsWith("//")) {
    return url
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_API_URL || "http://localhost:1338"}${media.url}`
}
