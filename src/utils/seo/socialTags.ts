export const generateSocialTags = (data: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}) => {
  const { title, description, image, url, type = 'website' } = data;

  return {
    // Facebook
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': 'FunJetSetter',
    'og:locale': 'en_US',

    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': '@funjettsetter',
    'twitter:creator': '@funjettsetter',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,

    // Additional social meta
    'pinterest:description': description,
    'pinterest:image': image,
    'linkedin:title': title,
    'linkedin:description': description,
    'linkedin:image': image
  };
};