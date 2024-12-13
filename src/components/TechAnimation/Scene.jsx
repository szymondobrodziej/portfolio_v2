import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

const TechIcon = ({ position, color, text, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <group ref={meshRef}>
        <mesh scale={scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
};

const ConnectingLines = () => {
  const linesRef = useRef();

  useEffect(() => {
    const lines = linesRef.current;
    gsap.to(lines.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <group ref={linesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i) * 5,
          Math.cos(i) * 5,
          Math.sin(i * 0.5) * 5
        ]}>
          <boxGeometry args={[0.05, 0.05, 10]} />
          <meshStandardMaterial
            color="#4f46e5"
            transparent
            opacity={0.2}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  );
};

const ParticleField = () => {
  const particlesRef = useRef();
  const count = 1000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4f46e5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  const techIcons = [
    { text: 'React', position: [-3, 2, 0], color: '#61dafb', scale: 1.2 },
    { text: 'Node', position: [3, 2, 0], color: '#68a063', scale: 1.2 },
    { text: 'Python', position: [0, 3, 2], color: '#ffd43b', scale: 1 },
    { text: 'JS', position: [-2, -1, 2], color: '#f7df1e', scale: 1 },
    { text: 'TS', position: [2, -1, 2], color: '#3178c6', scale: 1 },
  ];

  return (
    <div className="h-[600px] w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <ConnectingLines />
        <ParticleField />
        
        {techIcons.map((icon, index) => (
          <TechIcon key={index} {...icon} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
