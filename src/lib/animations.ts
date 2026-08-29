import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

// Register GSAP plugins in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initializes silky smooth section reveals using GSAP ScrollTrigger
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Kill existing scroll triggers to prevent duplicates on route changes
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Batch animate sections
  const sections = document.querySelectorAll('.animate-section');
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 35,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Stagger animate cards inside grids
  const cardGrids = document.querySelectorAll('.animate-grid');
  cardGrids.forEach((grid) => {
    const cards = grid.children;
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

/**
 * Smooth transition when switching pages using GSAP
 */
export function transitionPage(element: HTMLElement | null, callback?: () => void) {
  if (!element) {
    if (callback) callback();
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: callback,
    }
  );
}

/**
 * Anime.js spring bounce for interactive badges (e.g. cart badge or points pill)
 */
export function bounceElement(target: HTMLElement | string) {
  try {
    animate(target, {
      scale: [1.25, 0.95, 1],
      duration: 400,
      ease: 'outBack',
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Anime.js tactile button click pop
 */
export function popButton(target: HTMLElement | null) {
  if (!target) return;
  try {
    animate(target, {
      scale: [0.95, 1.03, 1],
      duration: 250,
      ease: 'outQuad',
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Staggered hero entrance using GSAP
 */
export function animateHeroEntrance(container: HTMLElement | null) {
  if (!container) return;

  const elements = container.querySelectorAll('.hero-anim-item');
  if (elements.length === 0) return;

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    }
  );
}

/**
 * Animated number roll-up using Anime.js
 */
export function animateCounter(
  element: HTMLElement | null, 
  startVal: number, 
  endVal: number, 
  prefix: string = '', 
  suffix: string = ''
) {
  if (!element) return;
  
  const obj = { val: startVal };
  try {
    animate(obj, {
      val: endVal,
      duration: 600,
      ease: 'outCubic',
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
      }
    });
  } catch {
    element.textContent = `${prefix}${Math.round(endVal).toLocaleString()}${suffix}`;
  }
}
