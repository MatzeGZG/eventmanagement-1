import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaTags } from '../../utils/seo/metaTags';
import { generateSocialTags } from '../../utils/seo/socialTags';
import { generateOrganizationSchema, generateWebsiteSchema } from '../../utils/seo/structuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  url,
  structuredData
}) => {
  const metaTags = generateMetaTags({ title, description, image, url });
  const socialTags = generateSocialTags({
    title: metaTags.title,
    description: description || metaTags.meta.find(m => m.name === 'description')?.content || '',
    image: image || 'https://static.wixstatic.com/media/f0f1ef_35d3520d058641e589b7d91f6c211beb.jpg',
    url: url || window.location.href
  });

  const baseStructuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema()
  ];

  const allStructuredData = structuredData 
    ? [...baseStructuredData, structuredData]
    : baseStructuredData;

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      
      {/* Meta Tags */}
      {metaTags.meta.map((tag, index) => (
        <meta key={`meta-${index}`} {...tag} />
      ))}

      {/* Social Tags */}
      {Object.entries(socialTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}

      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* Canonical URL */}
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};