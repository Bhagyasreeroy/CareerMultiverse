import { motion } from "framer-motion";

export const MultiversePortal = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            width: 200 + i * 100,
            height: 200 + i * 100,
            borderColor: `hsla(186, 100%, 50%, ${0.3 - i * 0.05})`,
            boxShadow: `0 0 ${20 + i * 5}px hsla(186, 100%, 50%, ${0.2 - i * 0.03}), inset 0 0 ${20 + i * 5}px hsla(186, 100%, 50%, ${0.1 - i * 0.02})`,
          }}
          initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.6, 0.3],
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Purple accent rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`purple-${i}`}
          className="absolute rounded-full border"
          style={{
            width: 250 + i * 120,
            height: 250 + i * 120,
            borderColor: `hsla(270, 100%, 65%, ${0.2 - i * 0.05})`,
            boxShadow: `0 0 ${15 + i * 5}px hsla(270, 100%, 65%, ${0.15 - i * 0.03})`,
          }}
          initial={{ scale: 0.9, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.2, 0.4, 0.2],
            rotate: i % 2 === 0 ? -360 : 360,
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, hsla(186, 100%, 50%, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: `${50 + (Math.random() - 0.5) * 40}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100, 0],
            y: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
