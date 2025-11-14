import { animate, inView } from "motion";

/**
 * Common animation configurations for consistent motion across components
 */
export const motionConfig = {
  // Timing
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  // Easing - using Motion One compatible formats
  easing: {
    smooth: "ease-in-out",
    bounce: "ease-out",
    easeOut: "ease-out",
  },
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

/**
 * Fade in animation for elements entering viewport
 */
export function fadeInOnScroll(
  element: HTMLElement,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) {
  return inView(
    element,
    () => {
      const startY = options?.y ?? 20;
      animate(
        element,
        {
          opacity: [0, 1],
          y: [startY, 0],
        } as Record<string, unknown>,
        {
          duration: options?.duration ?? motionConfig.duration.normal,
          delay: options?.delay ?? 0,
        }
      );
    },
    { margin: "-100px" }
  );
}

/**
 * Stagger animation for multiple elements
 */
export function staggerFadeIn(
  elements: HTMLElement[],
  options?: {
    delay?: number;
    staggerDelay?: number;
    y?: number;
  }
) {
  return animate(
    elements,
    {
      opacity: [0, 1],
      y: [options?.y ?? 20, 0],
    } as Record<string, unknown>,
    {
      duration: motionConfig.duration.normal,
      delay: options?.delay ?? 0,
    }
  );
}

/**
 * Scale animation for interactive elements
 */
export function scaleOnHover(element: HTMLElement, scale: number = 1.05) {
  const handleMouseEnter = () => {
    animate(
      element,
      { scale } as Record<string, unknown>,
      {
        duration: motionConfig.duration.fast,
      }
    );
  };

  const handleMouseLeave = () => {
    animate(
      element,
      { scale: 1 } as Record<string, unknown>,
      {
        duration: motionConfig.duration.fast,
      }
    );
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

