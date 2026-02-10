import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website', product }) => {
  const siteTitle = "HOWLITE | Modern Artifacts";
  const finalTitle = title ? `${title} — HOWLITE` : siteTitle;
  const finalDescription = description || "Handcrafted obsidian and recycled gold jewellery from Jaipur.";
  const finalImage = image || "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2670&auto=format&fit=crop"; // Default sharing image
  const siteUrl = "https://howlite-jewellery.com"; // Replace with your actual domain later
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;

  // JSON-LD Structured Data (The "Rich Snippet" Magic)
  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "HOWLITE"
    },
    "offers": {
      "@type": "Offer",
      "url": currentUrl,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HOWLITE",
    "url": siteUrl,
    "logo": finalImage,
    "sameAs": [
      "https://instagram.com/howlite",
      "https://facebook.com/howlite"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="HOWLITE" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;