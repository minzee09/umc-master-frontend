interface ScrollAnimationOptions {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  ease?: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
  distance?: number;
  repeat?: boolean;
}

const useScrollAnimation = ({
  delay = 0,
  duration = 0.8,
  direction = 'up',
  ease = 'easeOut',
  distance = 100,
  repeat = true,
}: ScrollAnimationOptions = {}) => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: !repeat, amount: 0.6 },
    variants: {
      hidden: {
        opacity: 0,
        ...directions[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease,
        },
      },
    },
  };
};

export default useScrollAnimation;
