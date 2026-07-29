import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Trail, Stars, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// A glowing, semi-transparent layered circle background
const GlowingCircles = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.5, 0.05, 16, 100]} position={[0, 0, -2]}>
        <meshBasicMaterial color="#36C2FF" transparent opacity={0.3} />
      </Torus>
      <Torus args={[3, 0.02, 16, 100]} position={[0, 0, -2.5]}>
        <meshBasicMaterial color="#6BE7FF" transparent opacity={0.15} />
      </Torus>
      <Torus args={[1.5, 0.1, 16, 100]} position={[0, 0, -1]}>
        <meshBasicMaterial color="#0B63CE" transparent opacity={0.4} />
      </Torus>
    </group>
  );
};

// Abstract Holographic Icon (3D Cross)
const MedicalCross = ({ position, rotationSpeed = 1 }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.5 * rotationSpeed;
    ref.current.rotation.y += delta * 0.8 * rotationSpeed;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <group ref={ref} scale={0.4}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.3, 0.3]} />
          <meshPhysicalMaterial 
            color="#6BE7FF" 
            emissive="#36C2FF" 
            emissiveIntensity={0.5} 
            transmission={0.9} 
            thickness={0.5} 
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshPhysicalMaterial 
            color="#6BE7FF" 
            emissive="#36C2FF" 
            emissiveIntensity={0.5} 
            transmission={0.9} 
            thickness={0.5} 
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Abstract Holographic Sphere (representing Cells/DNA)
const HolographicSphere = ({ position, color = "#36C2FF", scale = 0.4 }) => {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={position}>
      <Trail width={1} length={4} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <Sphere args={[scale, 32, 32]}>
          <MeshDistortMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.4} 
            distort={0.4} 
            speed={2} 
            transmission={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Trail>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F8FBFD" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#0B63CE" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#36C2FF" distance={5} />

      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      <GlowingCircles />
      
      {/* Central Object (The "Doctors" or central medical core) */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]}>
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.95}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={2}
            specularIntensity={1}
            specularColor="#ffffff"
          />
        </Sphere>
        {/* Inner core to give it depth */}
        <Sphere args={[0.9, 32, 32]}>
          <meshBasicMaterial color="#0B63CE" transparent opacity={0.8} />
        </Sphere>
      </Float>

      {/* Orbiting Elements */}
      <MedicalCross position={[2, 1.5, 0]} rotationSpeed={1.2} />
      <MedicalCross position={[-2, -1, 1]} rotationSpeed={0.8} />
      <HolographicSphere position={[-2.5, 1, -1]} color="#6BE7FF" scale={0.3} />
      <HolographicSphere position={[1.5, -2, 0.5]} color="#0B63CE" scale={0.5} />
      
      <OrbitControls />
    </>
  );
};

// Separate OrbitControls component to avoid importing from drei globally if we don't need user control, 
// wait, we just want it to rotate gently, we don't necessarily want orbit controls.
// Let's manually rotate the camera slightly.

const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * 1.5), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * 1.5), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};


const HeroComposition = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} style={{ touchAction: 'pan-y' }}>
        <Scene />
        <CameraRig />
      </Canvas>
    </div>
  );
};

export default HeroComposition;
