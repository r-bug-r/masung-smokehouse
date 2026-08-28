import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

// Register GSAP plugins
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
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
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
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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
 * Smooth transition when switching pages
 */
export function transitionPage(element: HTMLElement | null, callback?: () => void) {
  if (!element) {
    if (callback) callback();
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
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
      duration: 450,
      ease: 'outBack',
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
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out',
    }
  );
}
