import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE

// This component is a single rotating mesh
function MeshItem({ isDarkMode, position }: { isDarkMode: boolean, position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create a random rotation speed for each box
  const [rotationSpeed] = React.useState(() => ({
    x: (Math.random() - 0.5) * 0.2,
    y: (Math.random() - 0.5) * 0.2,
  }));

  // This hook runs on every rendered frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed.x;
      meshRef.current.rotation.y += delta * rotationSpeed.y;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={isDarkMode ? '#4b5563' : '#9ca3af'} 
        wireframe={true} 
      />
    </mesh>
  );
}

// This is the main scene component
export const ThreeDBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Suspense is needed for components that might load asynchronously */}
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={isDarkMode ? 0.5 : 1.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Render multiple items in different positions */}
          <MeshItem isDarkMode={isDarkMode} position={[0, 0, 0]} />
          <MeshItem isDarkMode={isDarkMode} position={[-5, 3, -5]} />
          <MeshItem isDarkMode={isDarkMode} position={[5, -3, -10]} />
          <MeshItem isDarkMode={isDarkMode} position={[3, 4, -2]} />
          <MeshItem isDarkMode={isDarkMode} position={[-3, -4, -12]} />

        </Suspense>
      </Canvas>
    </div>
  );
};
