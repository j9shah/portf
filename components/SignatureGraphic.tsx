'use client';

export function SignatureGraphic() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, var(--accent-subtle) 0%, transparent 70%)',
        }}
      />
      
      {/* Network graph SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          
          {/* Node gradient */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Primary network structure - centered around name area */}
        <g opacity="0.6">
          {/* Main horizontal data paths */}
          <path
            d="M 0 380 Q 200 380 300 340 T 500 360 T 700 340 T 900 380 L 1200 380"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 420 Q 250 420 400 450 T 600 430 T 800 460 T 1000 420 L 1200 420"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Vertical system paths */}
          <line x1="400" y1="100" x2="400" y2="700" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.3" />
          <line x1="600" y1="80" x2="600" y2="720" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.4" />
          <line x1="800" y1="120" x2="800" y2="680" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.3" />
          
          {/* Diagonal connections - representing data flow */}
          <path
            d="M 200 150 L 400 300 L 500 280 L 600 350"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 1000 180 L 800 320 L 700 300 L 600 350"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 250 650 L 400 500 L 550 520 L 600 450"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 950 620 L 800 480 L 650 500 L 600 450"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          
          {/* Orbit-like circular paths */}
          <ellipse
            cx="600"
            cy="400"
            rx="180"
            ry="100"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.2"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="300"
            ry="160"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.15"
            strokeDasharray="4 8"
          />
        </g>

        {/* Network nodes - junction points */}
        <g>
          {/* Central focal node */}
          <circle cx="600" cy="400" r="6" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="600" cy="400" r="3" fill="var(--accent)" opacity="0.5" />
          
          {/* Primary nodes */}
          <circle cx="400" cy="340" r="4" fill="url(#nodeGradient)" opacity="0.6" />
          <circle cx="800" cy="340" r="4" fill="url(#nodeGradient)" opacity="0.6" />
          <circle cx="400" cy="460" r="4" fill="url(#nodeGradient)" opacity="0.5" />
          <circle cx="800" cy="460" r="4" fill="url(#nodeGradient)" opacity="0.5" />
          
          {/* Secondary nodes */}
          <circle cx="300" cy="280" r="3" fill="var(--accent)" opacity="0.25" />
          <circle cx="500" cy="300" r="3" fill="var(--accent)" opacity="0.3" />
          <circle cx="700" cy="300" r="3" fill="var(--accent)" opacity="0.3" />
          <circle cx="900" cy="280" r="3" fill="var(--accent)" opacity="0.25" />
          
          <circle cx="300" cy="520" r="3" fill="var(--accent)" opacity="0.2" />
          <circle cx="500" cy="500" r="3" fill="var(--accent)" opacity="0.25" />
          <circle cx="700" cy="500" r="3" fill="var(--accent)" opacity="0.25" />
          <circle cx="900" cy="520" r="3" fill="var(--accent)" opacity="0.2" />
          
          {/* Edge nodes */}
          <circle cx="200" cy="200" r="2" fill="var(--accent)" opacity="0.15" />
          <circle cx="1000" cy="200" r="2" fill="var(--accent)" opacity="0.15" />
          <circle cx="200" cy="600" r="2" fill="var(--accent)" opacity="0.12" />
          <circle cx="1000" cy="600" r="2" fill="var(--accent)" opacity="0.12" />
          
          {/* Accent detail nodes */}
          <circle cx="550" cy="350" r="2" fill="var(--accent)" opacity="0.35" />
          <circle cx="650" cy="350" r="2" fill="var(--accent)" opacity="0.35" />
          <circle cx="550" cy="450" r="2" fill="var(--accent)" opacity="0.3" />
          <circle cx="650" cy="450" r="2" fill="var(--accent)" opacity="0.3" />
        </g>

        {/* Subtle grid overlay - security/technical feel */}
        <g opacity="0.04">
          {[...Array(12)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 70 + 50}
              x2="1200"
              y2={i * 70 + 50}
              stroke="var(--text-primary)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(16)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 80 + 40}
              y1="0"
              x2={i * 80 + 40}
              y2="800"
              stroke="var(--text-primary)"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </svg>
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, var(--bg-primary) 100%)',
        }}
      />
    </div>
  );
}
