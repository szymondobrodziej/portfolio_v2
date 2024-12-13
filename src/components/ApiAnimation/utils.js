import { DATA_SHAPES, ANIMATION_STATES, REQUEST_TYPES } from './constants';

export const generateRandomPath = (start, end, turbulence = 0) => {
  const midX = (start.x + end.x) / 2;
  const midY = start.y + (Math.random() - 0.5) * turbulence;
  return `M ${start.x},${start.y} Q ${midX},${midY} ${end.x},${end.y}`;
};

export const createDataParticles = (count, bounds) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${i}`,
    shape: Object.values(DATA_SHAPES)[Math.floor(Math.random() * Object.values(DATA_SHAPES).length)],
    x: bounds.x + Math.random() * bounds.width,
    y: bounds.y + Math.random() * bounds.height,
    scale: 0.5 + Math.random() * 0.5,
    rotation: Math.random() * 360,
    opacity: 0.3 + Math.random() * 0.7,
  }));
};

export const calculateParticlePath = (particle, target, duration) => {
  const angle = Math.atan2(target.y - particle.y, target.x - particle.x);
  const distance = Math.sqrt(
    Math.pow(target.x - particle.x, 2) + Math.pow(target.y - particle.y, 2)
  );
  
  return {
    x: [
      particle.x,
      particle.x + (distance / 3) * Math.cos(angle + Math.PI / 6),
      particle.x + (2 * distance / 3) * Math.cos(angle - Math.PI / 6),
      target.x,
    ],
    y: [
      particle.y,
      particle.y + (distance / 3) * Math.sin(angle + Math.PI / 6),
      particle.y + (2 * distance / 3) * Math.sin(angle - Math.PI / 6),
      target.y,
    ],
    timing: [0, 0.3, 0.7, 1],
    duration,
  };
};

export const generateStatusCode = (state) => {
  switch (state) {
    case ANIMATION_STATES.REQUESTING:
      return '102 Processing';
    case ANIMATION_STATES.PROCESSING:
      return '200 OK';
    case ANIMATION_STATES.RESPONDING:
      return '200 OK';
    case ANIMATION_STATES.ERROR:
      return '500 Internal Server Error';
    default:
      return '200 OK';
  }
};

export const getRequestTypeColor = (type) => {
  return REQUEST_TYPES[type]?.color || REQUEST_TYPES.GET.color;
};

export const generateDataShape = (shape, size = 20) => {
  switch (shape) {
    case DATA_SHAPES.SQUARE:
      return \`M 0,0 h \${size} v \${size} h -\${size} z\`;
    case DATA_SHAPES.TRIANGLE:
      return \`M \${size/2},0 L \${size},\${size} L 0,\${size} z\`;
    case DATA_SHAPES.HEXAGON:
      const a = size / 4;
      return \`M \${a},0 L \${3*a},0 L \${4*a},\${2*a} L \${3*a},\${4*a} L \${a},\${4*a} L 0,\${2*a} z\`;
    case DATA_SHAPES.CIRCLE:
    default:
      return \`M \${size/2},0 A \${size/2},\${size/2} 0 1,1 \${size/2},\${size} A \${size/2},\${size/2} 0 1,1 \${size/2},0\`;
  }
};

export const calculateBezierPoint = (t, p0, p1, p2, p3) => {
  const cX = 3 * (p1.x - p0.x);
  const bX = 3 * (p2.x - p1.x) - cX;
  const aX = p3.x - p0.x - cX - bX;
  
  const cY = 3 * (p1.y - p0.y);
  const bY = 3 * (p2.y - p1.y) - cY;
  const aY = p3.y - p0.y - cY - bY;
  
  const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
  
  return { x, y };
};

export const interpolateColors = (color1, color2, factor) => {
  const hex = (x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = r1 + factor * (r2 - r1);
  const g = g1 + factor * (g2 - g1);
  const b = b1 + factor * (b2 - b1);

  return \`#\${hex(r)}\${hex(g)}\${hex(b)}\`;
};

export const generateGlowFilter = (color, intensity = 1) => {
  return {
    filter: \`drop-shadow(0 0 \${2 * intensity}px \${color}) drop-shadow(0 0 \${4 * intensity}px \${color})\`,
  };
};
