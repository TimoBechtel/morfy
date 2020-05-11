declare module 'morfy';

interface MorfyOptions {
  /**
   * duration in seconds
   */
  duration: number;
  /**
   * css timing function
   * @example 'ease-in'
   */
  timingFunction: string;
  /**
   * css properties to be transitioned from source to target
   */
  effectedCssProperties: string[];
}

interface Morphable {
  /**
   * start morphing
   */
  morph: () => void;
  /**
   * morph to initial state
   */
  revert: () => void;
}

/**
 * Creates and initializes morphable object
 */
export function createMorphable(
  source: HTMLElement,
  target: HTMLElement,
  options: MorfyOptions
): Morphable;

/**
 * Directly morph things
 */
export function morph(
  source: HTMLElement,
  target: HTMLElement,
  options: MorfyOptions
): void;
