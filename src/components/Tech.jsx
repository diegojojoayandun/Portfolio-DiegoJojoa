import { motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Float, useTexture, Preload } from "@react-three/drei";
import * as THREE from "three";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

// Grid layout: positions for each ball in 3D space within a single canvas
const COLS = 4;
const SPACING = 3.2;

const GridBall = ({ imgUrl, col, row }) => {
  const [decal] = useTexture([imgUrl]);
  const x = (col - (COLS - 1) / 2) * SPACING;
  const y = -(row * SPACING);

  return (
    <Float
      position={[x, y, 0]}
      speed={1.5 + Math.random() * 1.5}
      rotationIntensity={0.8}
      floatIntensity={0.4}
    >
      <mesh castShadow receiveShadow scale={1.2}>
        <icosahedronGeometry args={[1, 2]} />
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

const Scene = ({ technologies }) => {
  const rows = Math.ceil(technologies.length / COLS);
  const { camera } = useThree();

  useMemo(() => {
    const totalHeight = (rows - 1) * SPACING;
    camera.position.set(0, -totalHeight / 2, 10);
    camera.lookAt(0, -totalHeight / 2, 0);
  }, [rows, camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, 2]} intensity={0.3} />
      {technologies.map((tech, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <GridBall
            key={tech.name}
            imgUrl={tech.icon}
            col={col}
            row={row}
          />
        );
      })}
    </>
  );
};

const Tech = () => {
  const cols = COLS;
  const rows = Math.ceil(technologies.length / cols);
  const canvasHeight = rows * 130 + 20;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="mt-14 w-full" style={{ height: `${canvasHeight}px` }}>
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{
            powerPreference: "low-power",
            preserveDrawingBuffer: true,
            antialias: false,
          }}
          camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 10] }}
        >
          <Suspense fallback={null}>
            <Scene technologies={technologies} />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
