'use client';

export function SignatureGraphic() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle radial gradient for depth - centered */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 45%, var(--accent-subtle) 0%, transparent 60%)',
        }}
      />
      
      {/* Network graph SVG - centered and balanced */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {/* Centered network structure */}
        <g opacity="0.5">
          {/* Horizontal flow lines - subtle */}
          <path
            d="M 100 390 Q 300 390 400 360 T 600 380 T 800 360 T 1000 390 L 1100 390"
            stroke="url(#lineGradient)"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            d="M 100 410 Q 350 410 500 440 T 700 420 T 900 440 T 1100 410"
            stroke="url(#lineGradient)"
            strokeWidth="0.75"
            fill="none"
          />
          
          {/* Vertical guides - very subtle */}
          <line x1="450" y1="150" x2="450" y2="650" stroke="var(--border-color)" strokeWidth="0.4" opacity="0.25" />
          <line x1="600" y1="100" x2="600" y2="700" stroke="var(--border-color)" strokeWidth="0.4" opacity="0.3" />
          <line x1="750" y1="150" x2="750" y2="650" stroke="var(--border-color)" strokeWidth="0.4" opacity="0.25" />
          
          {/* Diagonal connectors - balanced */}
          <path
            d="M 250 200 L 450 340 L 550 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M 950 200 L 750 340 L 650 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M 250 600 L 450 460 L 550 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M 950 600 L 750 460 L 650 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.2"
          />
          
          {/* Orbit rings - centered */}
          <ellipse
            cx="600"
            cy="400"
            rx="160"
            ry="90"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.18"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="280"
            ry="150"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.12"
            strokeDasharray="3 6"
          />
        </g>

        {/* Network nodes - symmetrical */}
        <g>
          {/* Central node */}
          <circle cx="600" cy="400" r="5" fill="url(#nodeGradient)" opacity="0.7" />
          <circle cx="600" cy="400" r="2.5" fill="var(--accent)" opacity="0.45" />
          
          {/* Primary ring */}
          <circle cx="450" cy="350" r="3.5" fill="url(#nodeGradient)" opacity="0.5" />
          <circle cx="750" cy="350" r="3.5" fill="url(#nodeGradient)" opacity="0.5" />
          <circle cx="450" cy="450" r="3.5" fill="url(#nodeGradient)" opacity="0.45" />
          <circle cx="750" cy="450" r="3.5" fill="url(#nodeGradient)" opacity="0.45" />
          
          {/* Secondary ring */}
          <circle cx="350" cy="300" r="2.5" fill="var(--accent)" opacity="0.2" />
          <circle cx="850" cy="300" r="2.5" fill="var(--accent)" opacity="0.2" />
          <circle cx="350" cy="500" r="2.5" fill="var(--accent)" opacity="0.18" />
          <circle cx="850" cy="500" r="2.5" fill="var(--accent)" opacity="0.18" />
          
          {/* Inner accent nodes */}
          <circle cx="530" cy="370" r="1.5" fill="var(--accent)" opacity="0.28" />
          <circle cx="670" cy="370" r="1.5" fill="var(--accent)" opacity="0.28" />
          <circle cx="530" cy="430" r="1.5" fill="var(--accent)" opacity="0.25" />
          <circle cx="670" cy="430" r="1.5" fill="var(--accent)" opacity="0.25" />
          
          {/* Outer edge nodes */}
          <circle cx="250" cy="220" r="2" fill="var(--accent)" opacity="0.12" />
          <circle cx="950" cy="220" r="2" fill="var(--accent)" opacity="0.12" />
          <circle cx="250" cy="580" r="2" fill="var(--accent)" opacity="0.1" />
          <circle cx="950" cy="580" r="2" fill="var(--accent)" opacity="0.1" />
        </g>

        {/* Very subtle grid - technical feel */}
        <g opacity="0.025">
          {[...Array(10)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 80 + 80}
              x2="1200"
              y2={i * 80 + 80}
              stroke="var(--text-primary)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(14)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 90 + 60}
              y1="0"
              x2={i * 90 + 60}
              y2="800"
              stroke="var(--text-primary)"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </svg>
      
      {/* Vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, var(--bg-primary) 90%)',
        }}
      />
    </div>
  );
}
