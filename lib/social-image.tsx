import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { personalInfo } from './data';

export async function createSocialImage() {
  const [owl, regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), 'app/icon.svg')),
    readFile(join(process.cwd(), 'assets/fonts/Inter-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/Inter-SemiBold.ttf')),
  ]);
  const colors = {
    background: '#101114',
    text: '#f1f1ef',
    secondary: '#b1b2b9',
    muted: '#999ba5',
    border: '#2b2d33',
    accent: '#9baecd',
  };

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '48px 80px 42px', background: colors.background, color: colors.text, fontFamily: 'Inter', fontWeight: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 27, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={`data:image/svg+xml;base64,${owl.toString('base64')}`} width="42" height="42" alt="" />
            <span style={{ fontSize: 23, fontWeight: 600, letterSpacing: -1 }}>JS<span style={{ color: colors.accent }}>.</span></span>
          </div>
          <span style={{ color: colors.accent, fontSize: 21, letterSpacing: -0.4 }}>{new URL(personalInfo.url).hostname}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 49 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.muted, fontSize: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />
            {personalInfo.location}
          </div>
          <div style={{ marginTop: 20, fontSize: 104, fontWeight: 600, letterSpacing: -6, lineHeight: 1.1 }}>{personalInfo.name}</div>
          <div style={{ maxWidth: 980, marginTop: 22, color: colors.secondary, fontSize: 27, lineHeight: 1.5, letterSpacing: -0.5 }}>{personalInfo.introduction}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 13, color: colors.secondary, fontSize: 27, letterSpacing: -0.5 }}>
            <span>Interested in</span>
            <span style={{ color: colors.accent }}>building things that matter</span>
            <span style={{ width: 1, height: 25, marginTop: 4, marginLeft: 1, background: colors.muted, opacity: 0.6 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 24, borderTop: `1px solid ${colors.border}`, fontSize: 18 }}>
          <span style={{ color: colors.muted }}>Selected work &amp; research</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, color: colors.secondary }}>
            <span>Software</span>
            <span style={{ color: colors.border }}>/</span>
            <span>Security</span>
            <span style={{ color: colors.border }}>/</span>
            <span>Machine learning</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );
}
