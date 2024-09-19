'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

const RoomLayout = () => {
  const { scene } = useGLTF('/room.glb');

  return (
    <div>
      <Canvas style={{ height: '100vh' }} camera={{ position: [0, 8, 0.001], fov: 50 }}>
        <ambientLight intensity={1.0} color="white" />
        <Environment preset="dawn" />

        {/* Display the 3D model */}
        <primitive object={scene} position={[0, 0, 1]} />

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default RoomLayout;
