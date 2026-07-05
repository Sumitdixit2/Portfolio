/**
 * JSON-LD Structured Data component.
 * Injects Person and WebSite schema markup for rich snippet eligibility in Google Search.
 * This is a Server Component — rendered at build/request time, not client-side.
 */
export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sumit Dixit',
    jobTitle: 'Backend Developer & DevOps Engineer',
    url: 'https://timus.co.in',
    sameAs: ['https://github.com/Sumitdixit2'],
    email: 'sumitdixit.dev@gmail.com',
    knowsAbout: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Docker',
      'Nginx',
      'GitHub Actions',
      'React',
      'Next.js',
      'TypeScript',
      'Redis',
      'Backend Development',
      'DevOps Engineering',
      'System Architecture',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'VIPS - GGSIPU',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sumit Dixit Portfolio',
    url: 'https://timus.co.in',
    description:
      'Portfolio of Sumit Dixit — Backend Developer & DevOps Engineer specializing in scalable system architecture.',
    author: {
      '@type': 'Person',
      name: 'Sumit Dixit',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
