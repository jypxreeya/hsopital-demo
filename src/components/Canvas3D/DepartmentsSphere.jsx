import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Html, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bone, Brain, HeartPulse, Baby, Stethoscope, Droplets, Microscope, Syringe, Zap, ShieldPlus } from 'lucide-react';
import * as THREE from 'three';
import styles from './DepartmentsSphere.module.css';

const departments = [
  { id: 'general', name: 'General Medicine', desc: 'Comprehensive care for all your primary health needs.', icon: Stethoscope },
  { id: 'ortho', name: 'Orthopedics', desc: 'Advanced treatment for bone and joint conditions.', icon: Bone },
  { id: 'neuro', name: 'Neurology', desc: 'Expert care for brain and nervous system disorders.', icon: Brain },
  { id: 'cardio', name: 'Cardiology', desc: 'State-of-the-art heart care and surgery.', icon: HeartPulse },
  { id: 'gyno', name: 'Gynecology', desc: 'Specialized healthcare for women of all ages.', icon: Baby },
  { id: 'pedia', name: 'Pediatrics', desc: 'Compassionate medical care for children.', icon: Baby }, // Using baby as placeholder
  { id: 'derma', name: 'Dermatology', desc: 'Advanced skin, hair, and nail treatments.', icon: Droplets },
  { id: 'nephro', name: 'Nephrology', desc: 'Complete care for kidney health.', icon: Activity },
  { id: 'physio', name: 'Physiotherapy', desc: 'Rehabilitation and physical therapy services.', icon: Activity },
  { id: 'radio', name: 'Radiology', desc: 'High-tech imaging and diagnostic services.', icon: Zap },
  { id: 'emergency', name: 'Emergency', desc: '24/7 rapid response critical care.', icon: ShieldPlus },
  { id: 'lab', name: 'Laboratory', desc: 'Accurate and timely clinical testing.', icon: Microscope },
];

const DepartmentCard = ({ dept, angle, radius, hoveredId, setHoveredId }) => {
  const isHovered = hoveredId === dept.id;
  const isFaded = hoveredId !== null && hoveredId !== dept.id;

  // Calculate 3D position based on angle and radius
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  // We'll add a slight y variation based on index to create a more dynamic orbit
  const y = Math.sin(angle * 3) * 1.5;

  return (
    <group position={[x, y, z]}>
      <Html center zIndexRange={[100, 0]}>
        <div 
          className={`${styles.deptCardWrapper} ${isHovered ? styles.hovered : ''} ${isFaded ? styles.faded : ''}`}
          onMouseEnter={() => setHoveredId(dept.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className={styles.deptCardInner}>
            <div className={styles.iconCircle}>
              <dept.icon size={24} className={styles.deptIcon} />
            </div>
            
            <div className={styles.deptInfo}>
              <h3 className={styles.deptName}>{dept.name}</h3>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className={styles.deptDescWrapper}
                  >
                    <p className={styles.deptDesc}>{dept.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const OrbitingSystem = () => {
  const groupRef = useRef();
  const [hoveredId, setHoveredId] = useState(null);
  
  // Gently rotate the entire system unless hovered
  useFrame((state, delta) => {
    if (!hoveredId) {
      groupRef.current.rotation.y += delta * 0.1;
    } else {
      // Slow down significantly when hovering
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  const radius = 5; // Radius of the orbit

  return (
    <group ref={groupRef}>
      {departments.map((dept, index) => {
        const angle = (index / departments.length) * Math.PI * 2;
        return (
          <DepartmentCard 
            key={dept.id} 
            dept={dept} 
            angle={angle} 
            radius={radius} 
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        );
      })}
    </group>
  );
};

// The glowing medical cross inside the central sphere
const MedicalCross = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.4, 0.4]} />
        <meshStandardMaterial color="#6BE7FF" emissive="#36C2FF" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color="#6BE7FF" emissive="#36C2FF" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
};

const CentralSphere = () => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere args={[2, 64, 64]}>
        <meshPhysicalMaterial 
          color="#0B63CE"
          transmission={0.9}
          opacity={1}
          metalness={0.2}
          roughness={0.1}
          ior={1.5}
          thickness={1}
          clearcoat={1}
        />
      </Sphere>
      <MedicalCross />
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#36C2FF" distance={10} />
      
      <CentralSphere />
      <OrbitingSystem />
      
      {/* Enable OrbitControls for interaction but disable zoom to keep layout intact */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
};

const DepartmentsSphere = () => {
  return (
    <Canvas camera={{ position: [0, 2, 12], fov: 45 }} style={{ touchAction: 'pan-y' }}>
      <Scene />
    </Canvas>
  );
};

export default DepartmentsSphere;
