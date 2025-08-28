// src/components/AnimatedSection/AnimatedSection.jsx
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0.2, duration = 0.6, yOffset = 50 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Anima apenas uma vez quando 30% visível
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay, duration, ease: "easeOut" },
      });
    }
  }, [isInView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={controls}
      style={{ width: '100%' }} // Garante que o div ocupe a largura total
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
