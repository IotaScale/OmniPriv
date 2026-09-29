"use client";

import React from "react";

export default function AmbientTechnicalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep midnight navy base gradient */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#060b17]" />

      {/* Atmospheric upper-left blue ambient glow (slowly breathing over 22s) */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full opacity-40 motion-reduce:opacity-20 motion-reduce:animate-none animate-[ambientPulse_22s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 184, 255, 0.08) 0%, rgba(2, 132, 199, 0.03) 45%, transparent 70%)",
        }}
      />

      {/* Restrained violet-blue ambient glow from far-right edge */}
      <div
        className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full opacity-35 motion-reduce:opacity-15 motion-reduce:animate-none animate-[ambientPulse_26s_ease-in-out_infinite_reverse]"
        style={{
          background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.06) 0%, rgba(79, 70, 229, 0.02) 50%, transparent 70%)",
        }}
      />

      {/* Lower subtle cyan depth light */}
      <div
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 184, 255, 0.04) 0%, transparent 65%)",
        }}
      />

      {/* Faint technical grid pattern (3.5% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 184, 255, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 184, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle network lines and small nodes with slow travelling data pulses */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] motion-reduce:opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B8FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00B8FF" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Network connection line 1 */}
        <path
          d="M -50,180 L 350,180 L 520,340 L 980,340 L 1200,520 L 1950,520"
          fill="none"
          stroke="url(#netGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        {/* Network connection line 2 */}
        <path
          d="M 100,750 L 450,750 L 680,950 L 1300,950 L 1550,1180 L 2050,1180"
          fill="none"
          stroke="url(#netGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Nodes */}
        <circle cx="350" cy="180" r="3" fill="#00B8FF" opacity="0.6" />
        <circle cx="520" cy="340" r="3.5" fill="#6366F1" opacity="0.7" />
        <circle cx="980" cy="340" r="3" fill="#00B8FF" opacity="0.6" />
        <circle cx="1200" cy="520" r="4" fill="#38BDF8" opacity="0.8" />
        
        <circle cx="450" cy="750" r="3" fill="#00B8FF" opacity="0.5" />
        <circle cx="680" cy="950" r="3.5" fill="#818CF8" opacity="0.6" />
        <circle cx="1300" cy="950" r="3" fill="#00B8FF" opacity="0.5" />
      </svg>
    </div>
  );
}
