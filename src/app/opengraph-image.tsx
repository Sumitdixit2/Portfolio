import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sumit Dixit | Backend Developer & DevOps Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#030712', // deep slate
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '100px',
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(135deg, #030712 0%, #172554 100%)',
          }}
        />
        
        {/* Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            backgroundImage: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)',
          }}
        />

        {/* Floating Code Accent */}
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            top: '80px',
            display: 'flex',
            flexDirection: 'column',
            opacity: 0.05,
            fontSize: '40px',
            fontFamily: 'monospace',
            color: 'white',
            lineHeight: 1.5,
            whiteSpace: 'pre',
          }}
        >
          {`const sumit = {
  role: 'Backend Dev',
  skills: ['Node.js', 'Docker', 'AWS'],
  status: 'Building systems',
};`}
        </div>

        {/* Main Content (relative to stay above background) */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          {/* Logo / Monogram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '24px',
              backgroundImage: 'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 800,
                color: 'white',
              }}
            >
              SD
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '84px',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              Sumit Dixit
            </div>
            
            <div
              style={{
                fontSize: '42px',
                fontWeight: 500,
                color: '#94a3b8',
                letterSpacing: '-0.01em',
              }}
            >
              Backend Developer & DevOps Engineer
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '60px',
            }}
          >
            {['Node.js', 'Express', 'PostgreSQL', 'Docker'].map((tech) => (
              <div
                key={tech}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '100px',
                  color: '#e2e8f0',
                  fontSize: '28px',
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
