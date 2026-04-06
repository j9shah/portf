import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jainam Shah - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Otter icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100">
            <ellipse cx="50" cy="52" rx="35" ry="32" fill="#8B7355"/>
            <circle cx="22" cy="30" r="10" fill="#6B5344"/>
            <circle cx="78" cy="30" r="10" fill="#6B5344"/>
            <circle cx="22" cy="30" r="6" fill="#D4C4B0"/>
            <circle cx="78" cy="30" r="6" fill="#D4C4B0"/>
            <ellipse cx="50" cy="58" rx="22" ry="18" fill="#D4C4B0"/>
            <ellipse cx="38" cy="48" rx="6" ry="7" fill="#1a1a1a"/>
            <ellipse cx="62" cy="48" rx="6" ry="7" fill="#1a1a1a"/>
            <circle cx="40" cy="46" r="2" fill="#fff"/>
            <circle cx="64" cy="46" r="2" fill="#fff"/>
            <ellipse cx="50" cy="60" rx="8" ry="5" fill="#1a1a1a"/>
          </svg>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#f5f0e8',
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}
        >
          Jainam Shah
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '28px',
            color: '#D4C4B0',
            marginBottom: '40px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Cybersecurity & Machine Learning
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          {['Security Operations', 'ML/AI', 'Research'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '12px 24px',
                background: 'rgba(212,196,176,0.1)',
                border: '1px solid rgba(212,196,176,0.2)',
                borderRadius: '8px',
                color: '#a09080',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: '#666',
          }}
        >
          jainamshah.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
