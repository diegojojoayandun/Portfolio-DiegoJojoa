import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import Loader from '../Loader';

const isMobile = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#3d3d3d"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const FallbackIcon = ({ icon }) => (
  <div className="w-full h-full rounded-full bg-[#3d3d3d] flex items-center justify-center p-4 shadow-lg">
    <img src={icon} alt="tech icon" className="w-full h-full object-contain" />
  </div>
);

const BallCanvas = ({ icon }) => {
  const [mobile, setMobile] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  if (mobile || failed) {
    return <FallbackIcon icon={icon} />;
  }

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        if (!gl) setFailed(true);
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
