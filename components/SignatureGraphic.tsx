'use client';

export function SignatureGraphic() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Radial gradient for depth - dark mode */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 45%, var(--accent-subtle) 0%, transparent 70%)',
        }}
      />
      
      {/* Light mode: stronger warm gradient */}
      <div 
        className="absolute inset-0 block dark:hidden"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(146, 64, 14, 0.06) 0%, transparent 60%)',
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
          {/* Dark mode gradients */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </radialGradient>
          
          {/* Light mode gradients - visible but not harsh */}
          <linearGradient id="lineGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
          </linearGradient>
          
          <radialGradient id="nodeGradientLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Centered network structure - dark mode */}
        <g className="hidden dark:block" opacity="0.7">
          {/* Horizontal flow lines */}
          <path
            d="M 100 390 Q 300 390 400 360 T 600 380 T 800 360 T 1000 390 L 1100 390"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 100 410 Q 350 410 500 440 T 700 420 T 900 440 T 1100 410"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Vertical guides */}
          <line x1="450" y1="150" x2="450" y2="650" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.35" />
          <line x1="600" y1="100" x2="600" y2="700" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.4" />
          <line x1="750" y1="150" x2="750" y2="650" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.35" />
          
          {/* Diagonal connectors */}
          <path
            d="M 250 200 L 450 340 L 550 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 950 200 L 750 340 L 650 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 250 600 L 450 460 L 550 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 950 600 L 750 460 L 650 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          
          {/* Orbit rings */}
          <ellipse
            cx="600"
            cy="400"
            rx="160"
            ry="90"
            stroke="var(--border-color)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.25"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="280"
            ry="150"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.18"
            strokeDasharray="4 8"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="380"
            ry="200"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.1"
            strokeDasharray="2 6"
          />
        </g>
        
        {/* Centered network structure - light mode */}
        <g className="block dark:hidden" opacity="0.55">
          {/* Horizontal flow lines */}
          <path
            d="M 100 390 Q 300 390 400 360 T 600 380 T 800 360 T 1000 390 L 1100 390"
            stroke="url(#lineGradientLight)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 100 410 Q 350 410 500 440 T 700 420 T 900 440 T 1100 410"
            stroke="url(#lineGradientLight)"
            strokeWidth="0.8"
            fill="none"
          />
          
          {/* Vertical guides */}
          <line x1="450" y1="150" x2="450" y2="650" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.5" />
          <line x1="600" y1="100" x2="600" y2="700" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.6" />
          <line x1="750" y1="150" x2="750" y2="650" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.5" />
          
          {/* Diagonal connectors */}
          <path
            d="M 250 200 L 450 340 L 550 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 950 200 L 750 340 L 650 320 L 600 380"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 250 600 L 450 460 L 550 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 950 600 L 750 460 L 650 480 L 600 420"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.35"
          />
          
          {/* Orbit rings */}
          <ellipse
            cx="600"
            cy="400"
            rx="160"
            ry="90"
            stroke="var(--border-color)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.35"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="280"
            ry="150"
            stroke="var(--border-color)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.25"
            strokeDasharray="4 8"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="380"
            ry="200"
            stroke="var(--border-color)"
            strokeWidth="0.3"
            fill="none"
            opacity="0.15"
            strokeDasharray="2 6"
          />
        </g>

        {/* Network nodes - dark mode */}
        <g className="hidden dark:block">
          {/* Central node */}
          <circle cx="600" cy="400" r="6" fill="url(#nodeGradient)" opacity="0.8" />
          <circle cx="600" cy="400" r="3" fill="var(--accent)" opacity="0.6" />
          
          {/* Primary ring */}
          <circle cx="450" cy="350" r="4" fill="url(#nodeGradient)" opacity="0.6" />
          <circle cx="750" cy="350" r="4" fill="url(#nodeGradient)" opacity="0.6" />
          <circle cx="450" cy="450" r="4" fill="url(#nodeGradient)" opacity="0.55" />
          <circle cx="750" cy="450" r="4" fill="url(#nodeGradient)" opacity="0.55" />
          
          {/* Secondary ring */}
          <circle cx="350" cy="300" r="3" fill="var(--accent)" opacity="0.3" />
          <circle cx="850" cy="300" r="3" fill="var(--accent)" opacity="0.3" />
          <circle cx="350" cy="500" r="3" fill="var(--accent)" opacity="0.25" />
          <circle cx="850" cy="500" r="3" fill="var(--accent)" opacity="0.25" />
          
          {/* Inner accent nodes */}
          <circle cx="530" cy="370" r="2" fill="var(--accent)" opacity="0.35" />
          <circle cx="670" cy="370" r="2" fill="var(--accent)" opacity="0.35" />
          <circle cx="530" cy="430" r="2" fill="var(--accent)" opacity="0.3" />
          <circle cx="670" cy="430" r="2" fill="var(--accent)" opacity="0.3" />
          
          {/* Outer edge nodes */}
          <circle cx="250" cy="220" r="2.5" fill="var(--accent)" opacity="0.18" />
          <circle cx="950" cy="220" r="2.5" fill="var(--accent)" opacity="0.18" />
          <circle cx="250" cy="580" r="2.5" fill="var(--accent)" opacity="0.15" />
          <circle cx="950" cy="580" r="2.5" fill="var(--accent)" opacity="0.15" />
        </g>
        
        {/* Network nodes - light mode */}
        <g className="block dark:hidden">
          {/* Central node */}
          <circle cx="600" cy="400" r="5" fill="url(#nodeGradientLight)" opacity="0.65" />
          <circle cx="600" cy="400" r="2.5" fill="var(--accent)" opacity="0.45" />
          
          {/* Primary ring */}
          <circle cx="450" cy="350" r="3.5" fill="url(#nodeGradientLight)" opacity="0.5" />
          <circle cx="750" cy="350" r="3.5" fill="url(#nodeGradientLight)" opacity="0.5" />
          <circle cx="450" cy="450" r="3.5" fill="url(#nodeGradientLight)" opacity="0.45" />
          <circle cx="750" cy="450" r="3.5" fill="url(#nodeGradientLight)" opacity="0.45" />
          
          {/* Secondary ring */}
          <circle cx="350" cy="300" r="2.5" fill="var(--accent)" opacity="0.2" />
          <circle cx="850" cy="300" r="2.5" fill="var(--accent)" opacity="0.2" />
          <circle cx="350" cy="500" r="2.5" fill="var(--accent)" opacity="0.18" />
          <circle cx="850" cy="500" r="2.5" fill="var(--accent)" opacity="0.18" />
          
          {/* Inner accent nodes */}
          <circle cx="530" cy="370" r="1.5" fill="var(--accent)" opacity="0.25" />
          <circle cx="670" cy="370" r="1.5" fill="var(--accent)" opacity="0.25" />
          <circle cx="530" cy="430" r="1.5" fill="var(--accent)" opacity="0.22" />
          <circle cx="670" cy="430" r="1.5" fill="var(--accent)" opacity="0.22" />
          
          {/* Outer edge nodes */}
          <circle cx="250" cy="220" r="2" fill="var(--accent)" opacity="0.15" />
          <circle cx="950" cy="220" r="2" fill="var(--accent)" opacity="0.15" />
          <circle cx="250" cy="580" r="2" fill="var(--accent)" opacity="0.12" />
          <circle cx="950" cy="580" r="2" fill="var(--accent)" opacity="0.12" />
        </g>

        {/* Grid - dark mode */}
        <g className="hidden dark:block" opacity="0.035">
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
        
        {/* Grid - light mode */}
        <g className="block dark:hidden" opacity="0.025">
          {[...Array(10)].map((_, i) => (
            <line
              key={`h-light-${i}`}
              x1="0"
              y1={i * 80 + 80}
              x2="1200"
              y2={i * 80 + 80}
              stroke="var(--text-primary)"
              strokeWidth="0.4"
            />
          ))}
          {[...Array(14)].map((_, i) => (
            <line
              key={`v-light-${i}`}
              x1={i * 90 + 60}
              y1="0"
              x2={i * 90 + 60}
              y2="800"
              stroke="var(--text-primary)"
              strokeWidth="0.4"
            />
          ))}
        </g>
      </svg>
      
      {/* Vignette for depth - dark mode */}
      <div 
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, var(--bg-primary) 85%)',
        }}
      />
      {/* Vignette for depth - light mode (softer to keep background visible) */}
      <div 
        className="absolute inset-0 pointer-events-none block dark:hidden"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, var(--bg-primary) 90%)',
        }}
      />
    </div>
  );
}
