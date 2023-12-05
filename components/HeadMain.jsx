import React from 'react';
import Head from 'next/head';
function HeadMain({
  title,
  description,
  keyword,
  ogTitle,
  ogDescription,
  ogImageUrl,
  ogImageAlt,
  ogUrl,
  ogImageType,
  ogImageWidth,
  ogImageHeight,
}) {
  return (
    <Head>
      <title>{title}</title>

      {/* META SEO */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />

      {/* META OG */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:url" content={ogImageUrl} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
    </Head>
  );
}

export default HeadMain;
