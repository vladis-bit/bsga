import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bsga.sk";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/HpavsgOHofdkbH1lIuwA8kv2W203/social-images/social-1775797342318-Screenshot_2026-04-10_at_07.02.10.webp";

type SEOProps = {
  title: string;
  description: string;
  path: string; // e.g. "/o-nas" or "/"
  ogType?: "website" | "article";
  image?: string;
  imageAlt?: string;
  /** Path/URL of the LCP image on this route — emitted as <link rel="preload" as="image">. */
  preloadImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: Array<{ name: string; url: string }>;
};

const SEO = ({
  title,
  description,
  path,
  ogType = "website",
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  preloadImage,
  noindex = false,
  nofollow = false,
  jsonLd,
  breadcrumbs,
}: SEOProps) => {

  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  // Ensure non-production hosts (Lovable preview, custom staging) are never
  // indexed with production canonical — avoids duplicate content risk.
  const isProdHost =
    typeof window === "undefined" ||
    window.location.hostname === "bsga.sk" ||
    window.location.hostname === "www.bsga.sk";
  const shouldNoindex = noindex || !isProdHost;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? [...jsonLd] : [jsonLd]) : [];
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.unshift({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {shouldNoindex ? (
        nofollow ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="noindex, follow" />
        )
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="alternate" hrefLang="sk" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      {preloadImage ? (
        <link rel="preload" as="image" href={preloadImage} fetchpriority="high" />
      ) : null}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      <meta property="og:locale" content="sk_SK" />
      <meta property="og:site_name" content="Best Swing Golf Academy" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}


      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;