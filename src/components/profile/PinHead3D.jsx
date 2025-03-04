const PinHead3D = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="headGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#f0f0f0" }} />
        <stop offset="70%" style={{ stopColor: "#c0c0c0" }} />
        <stop offset="100%" style={{ stopColor: "#808080" }} />
      </radialGradient>
      <filter id="shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
        <feOffset dx="1" dy="1" result="offsetblur" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <ellipse
      cx="50"
      cy="50"
      rx="50"
      ry="50"
      fill="url(#headGradient)"
      filter="url(#shadow)"
    />
  </svg>
);

export default PinHead3D;
