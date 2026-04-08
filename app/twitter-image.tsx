import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jainam Shah - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Owl icon as base64 SVG
const owlBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3MiA3MiI+CiAgPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiBmaWxsPSIjMWExYTFhIiByeD0iMTIiLz4KICA8Zz4KICAgIDxwYXRoIGZpbGw9IiM5QjlCOUEiIGQ9Ik0zMCwyOWwtMywyYy05LjUsNC4zNzUtMiwzMC0yLDMwczguNzUtOS4yNSwxNS44NzUtMTAuMTI1UzUxLjc1LDM2Ljc1LDUwLDMybC0yLTQiLz4KICAgIDxwYXRoIGZpbGw9IiM5QjlCOUEiIGQ9Ik0zMCwzMGMwLDAtNi41LTUuNS0wLjI1LTE0Ljc1YzAsMC0wLjc1LTMuMjUtMi43NS0zLjI1czUtMyw2LDFjMCwwLDctMywxMSwwYzAsMCw1LjI1LTMuNSw3LjEyNS0xLjc1QzUxLjEyNSwxMS4yNSw0NywxNCw0OSwxNnM0LDEwLTEsMTQiLz4KICAgIDxwYXRoIGZpbGw9IiNBNTc5MzkiIGQ9Ik00MCwzMGMwLDAtMTAsMC0xMC03Ljg3NWMwLTguNzM0MSw4LjE5MDctNC43MzU5LDktMy4xMjVjMCwwLDctNiw5LjEyNSwxLjVDNTAuMTgzNCwyNy43NjQ5LDQwLDMwLDQwLDMweiIvPgogICAgPHBhdGggZmlsbD0iI0E1NzkzOSIgZD0iTTI1LjAxOTIsNTljMCwwLTAuODc4Mi03LDEuOTAyNy05UzQwLDQwLDM3LDM1Ii8+CiAgPC9nPgo8L3N2Zz4=';

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
        {/* Owl icon in top left */}
        <img
          src={owlBase64}
          width="80"
          height="80"
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            borderRadius: '12px',
          }}
        />

        {/* Name only - clean and professional */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: '#f5f0e8',
            letterSpacing: '-3px',
          }}
        >
          Jainam Shah
        </div>
      </div>
    ),
    { ...size }
  );
}
