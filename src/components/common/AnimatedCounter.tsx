```tsx
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatFn?: (value: number) => string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1,
  formatFn = (v) => v.toLocaleString()
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const spring = useSpring(displayValue, {
      duration,
      bounce: 0.25
    });

    spring.onChange(latest => {
      setDisplayValue(Math.round(latest));
    });

    spring.set(value);

    return () => spring.stop();
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="tabular-nums"
    >
      {formatFn(displayValue)}
    </motion.span>
  );
};
```