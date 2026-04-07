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

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(212,196,176,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Owl in top left corner */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            opacity: 0.9,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 72 72">
            <g>
              <path fill="#9B9B9A" stroke="#9B9B9A" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.8" d="M30,29l-3,2c-9.5,4.375-2,30-2,30s8.75-9.25,15.875-10.125S51.75,36.75,50,32l-2-4"/>
              <path fill="#9B9B9A" stroke="none" d="M30,30c0,0-6.5-5.5-0.25-14.75c0,0-0.75-3.25-2.75-3.25s5-3,6,1c0,0,7-3,11,0c0,0,5.25-3.5,7.125-1.75 C51.125,11.25,47,14,49,16s4,10-1,14"/>
              <path fill="#A57939" stroke="none" d="M40,30c0,0-10,0-10-7.875c0-8.7341,8.1907-4.7359,9-3.125c0,0,7-6,9.125,1.5C50.1834,27.7649,40,30,40,30z"/>
              <path fill="#A57939" stroke="none" d="M25.0192,59c0,0-0.8782-7,1.9027-9S40,40,37,35"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M37,22c0,0,0.5-1.5-3-2"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M41,22c0,0-0.5-1.5,3-2"/>
              <polyline fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" points="37.625,25.43 39.375,27 41.375,25.3438"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M38,60c0,0,1-4-5-3v-2.375"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M43,57.375c0,0,1-4-5-3V52"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M30,30c0,0-6.5-5.5-0.25-14.75c0,0-0.75-3.25-2.75-3.25s5-3,6,1c0,0,7-3,11,0c0,0,5.25-3.5,7.125-1.75C51.125,11.25,47,14,49,16 s4,10-1,14"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M40,30c0,0-10,0-10-7.875c0-8.7341,8.1907-4.7359,9-3.125c0,0,7-6,9.125,1.5C50.1834,27.7649,40,30,40,30z"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M27,31c-9.5,4.375-2,30-2,30s8.75-9.25,15.875-10.125S51.75,36.75,50,32"/>
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M25,59c0,0-0.75-7,1.625-9S37,41,36,35"/>
            </g>
          </svg>
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

        {/* Navigation links styled like hero */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            fontSize: '24px',
            color: '#999',
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
