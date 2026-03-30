'use client';

export function SignatureGraphic() {
  return (
    <svg
      className="absolute inset-0 w-full h-full -z-10"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Transit map style lines */}
      <g opacity="0.08">
        {/* Line 1 - Diagonal from top-left to bottom-right */}
        <line
          x1="100"
          y1="100"
          x2="500"
          y2="450"
          stroke="#D8D2C8"
          strokeWidth="1"
        />
        
        {/* Line 2 - Horizontal across middle */}
        <line
          x1="50"
          y1="300"
          x2="700"
          y2="300"
          stroke="#D8D2C8"
          strokeWidth="1"
        />
        
        {/* Line 3 - Diagonal from bottom-left to top-right */}
        <line
          x1="150"
          y1="500"
          x2="650"
          y2="150"
          stroke="#D8D2C8"
          strokeWidth="1"
        />
        
        {/* Line 4 - Vertical */}
        <line
          x1="400"
          y1="50"
          x2="400"
          y2="550"
          stroke="#D8D2C8"
          strokeWidth="1"
        />
        
        {/* Junction nodes */}
        <circle cx="400" cy="300" r="4" fill="#D8D2C8" />
        <circle cx="300" cy="300" r="4" fill="#D8D2C8" />
        <circle cx="400" cy="250" r="4" fill="#D8D2C8" />
        <circle cx="500" cy="300" r="4" fill="#D8D2C8" />
        <circle cx="250" cy="375" r="4" fill="#D8D2C8" />
        <circle cx="550" cy="225" r="4" fill="#D8D2C8" />
      </g>
    </svg>
  );
}
