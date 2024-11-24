import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HalvorsenAttractor() {
    // eslint-disable-next-line
  const points = useRef<THREE.Points>(null);
  const numPoints = 10000;
  const a = 1.4;
  const dt = 0.004;

  const positions = useMemo(() => {
    const positions = new Float32Array(numPoints * 3);
    let x = 1, y = 0, z = 0;
    
    for (let i = 0; i < numPoints * 3; i += 3) {
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
      
      // Halvorsen equations
      const dx = (-a * x - 4 * y - 4 * z - y * y) * dt;
      const dy = (-a * y - 4 * z - 4 * x - z * z) * dt;
      const dz = (-a * z - 4 * x - 4 * y - x * x) * dt;
      
      x += dx;
      y += dy;
      z += dz;
    }
    
    return positions;
  }, []);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.x = clock.getElapsedTime() * 0.1;
      points.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <points ref={points} scale={[0.15, 0.15, 0.15]}>
      <primitive object={geometry} />
      <pointsMaterial
        size={0.015}
        color="#4169e1"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}