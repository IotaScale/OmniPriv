export default function HeroBackground2() {
  const streams = [
    "M -100,430 C 300,300 900,540 1300,380",
    "M -100,170 C 400,320 800,110 1300,250",
    "M -100,300 C 350,170 850,430 1300,300",
    "M -100,520 C 450,430 850,600 1300,470",
  ];

  const particles = [
    { x: 12, y: 30, d: 0, t: 9 },
    { x: 24, y: 68, d: 1.4, t: 11 },
    { x: 38, y: 22, d: 2.2, t: 10 },
    { x: 55, y: 74, d: 0.8, t: 12 },
    { x: 68, y: 34, d: 3.1, t: 9.5 },
    { x: 79, y: 62, d: 1.9, t: 13 },
    { x: 88, y: 26, d: 2.7, t: 10.5 },
    { x: 8, y: 58, d: 3.6, t: 11.5 },
    { x: 46, y: 48, d: 4.2, t: 12.5 },
    { x: 92, y: 70, d: 1.1, t: 9.8 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting aurora gradients */}
      <div className="hero-aurora hero-aurora-1" />
      <div className="hero-aurora hero-aurora-2" />
      <div className="hero-aurora hero-aurora-3" />
      <div className="hero-aurora hero-aurora-4" />

      {/* Access streams flowing across the hero */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {streams.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#00B8FF" strokeOpacity="0.1" strokeWidth="1" />
            <path
              d={d}
              stroke="#00B8FF"
              strokeOpacity="0.38"
              strokeWidth="1.4"
              strokeDasharray="6 18"
              className="hero-flow"
              style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${4 + i}s` }}
            />
            <circle r="2.6" fill="#00B8FF" fillOpacity="0.9">
              <animateMotion dur={`${7 + i * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} path={d} />
            </circle>
          </g>
        ))}
      </svg>

      {/* Floating identity particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.t}s`,
          }}
        />
      ))}
    </div>
  );
}
