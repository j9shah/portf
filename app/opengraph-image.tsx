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
        {/* Simple decorative element instead of complex SVG */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4c4b0 0%, #a89070 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
        >
          🦉
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: '#f5f0e8',
            marginBottom: '24px',
            letterSpacing: '-3px',
          }}
        >
          Jainam Shah
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            color: '#d4c4b0',
            marginBottom: '32px',
          }}
        >
          Software Engineer
        </div>

        {/* Navigation links */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            fontSize: '24px',
            color: '#888',
          }}
        >
          <span>Experience</span>
          <span>Projects</span>
          <span>Contact</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
