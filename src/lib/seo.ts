// Configuration SEO centralisée — réutilisée par layout, sitemap, robots et le JSON-LD.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://solomasuarl.sn'
).replace(/\/$/, '');

// ⚠️ À COMPLÉTER avec les vraies coordonnées de SOLOMA SUARL
export const BUSINESS = {
  name: 'SOLOMA SUARL',
  legalName: 'SOLOMA SUARL',
  description:
    'Spécialiste de la manutention portuaire et du levage industriel en Afrique de l’Ouest. Location de grues de 50 à 500 tonnes, opérations 24h/24.',
  telephone: '+221 XX XXX XX XX', // TODO: numéro réel
  email: 'contact@solomasuarl.sn', // TODO: vérifier l’adresse
  address: {
    locality: 'Dakar',
    region: 'Dakar',
    country: 'SN',
  },
  geo: { lat: 14.6928, lng: -17.4467 }, // Dakar (approx.) — affiner si adresse précise
  areaServed: ['Sénégal', 'Afrique de l’Ouest'],
  sameAs: [] as string[], // URLs réseaux sociaux quand disponibles
};

/** JSON-LD schema.org LocalBusiness pour les résultats enrichis Google */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: BUSINESS.areaServed,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };
}
