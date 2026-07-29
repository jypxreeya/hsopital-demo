import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef();
  
  // Generate random particles
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      // Distribute in a wide sphere/cylinder
      const radius = 10 + Math.random() * 20;
      const theta = 2 * Math.PI * Math.random();
      const y = (Math.random() - 0.5) * 40;
      
      positions[i3] = radius * Math.cos(theta);
      positions[i3 + 1] = y;
      positions[i3 + 2] = radius * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y -= delta * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#36C2FF" 
          size={0.08} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const BackgroundParticles = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10] }} style={{ pointerEvents: 'none', touchAction: 'pan-y' }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default BackgroundParticles;
