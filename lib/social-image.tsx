import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { personalInfo } from './data';

export async function createSocialImage() {
  const owl = await readFile(join(process.cwd(), 'app/icon.svg'));

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '64px 80px', background: '#101114', color: '#f1f1ef', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={`data:image/svg+xml;base64,${owl.toString('base64')}`} width="56" height="56" alt="" />
          <span style={{ color: '#999ba5', fontSize: 18, letterSpacing: 3 }}>PORTFOLIO</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 70 }}>
          <div style={{ fontSize: 80, fontWeight: 600, letterSpacing: -4 }}>{personalInfo.name}</div>
          <div style={{ maxWidth: 900, marginTop: 24, color: '#b1b2b9', fontSize: 28, lineHeight: 1.5 }}>{personalInfo.introduction}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 26, borderTop: '1px solid #2b2d33', color: '#9baecd', fontSize: 22 }}>
          {new URL(personalInfo.url).hostname}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
