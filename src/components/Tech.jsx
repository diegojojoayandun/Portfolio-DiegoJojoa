import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture, View, Html } from "@react-three/drei";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
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

const BallView = ({ icon }) => {
  const ref = useRef();
  return (
    <div ref={ref} className="w-28 h-28">
      <View index={technologies.findIndex(t => t.icon === icon) + 1} track={ref} className="w-full h-full">
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>
      </View>
    </div>
  );
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="relative flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <BallView key={technology.name} icon={technology.icon} />
        ))}

        {/* Single shared Canvas for all balls */}
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{ powerPreference: "low-power", preserveDrawingBuffer: true }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: -1,
          }}
          eventSource={document.getElementById("root")}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
