import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const DataParticle = ({ color, position, shape = 'circle', size = 4 }) => {
  const { isDark } = useTheme();
  
  const getShapePath = () => {
    switch (shape) {
      case 'square':
        return `M-${size/2},-${size/2} h${size} v${size} h-${size}z`;
      case 'triangle':
        return `M0,-${size/2} l${size/2},${size} l-${size},0z`;
      case 'hexagon': {
        const a = size / 2;
        const b = a * Math.sqrt(3) / 2;
        return `M${a},0 L${b},${-a/2} L${b},${a/2} L${a},${a} L${-a},${a} L${-b},${a/2} L${-b},${-a/2} L${-a},${-a}z`;
      }
      default: // circle
        return '';
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {shape === 'circle' ? (
        <motion.div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ) : (
        <motion.svg
          width={size * 2}
          height={size * 2}
          viewBox={`-${size} -${size} ${size * 2} ${size * 2}`}
        >
          <motion.path
            d={getShapePath()}
            fill={color}
            stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
            strokeWidth="1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      )}
    </motion.div>
  );
};

export default DataParticle;
