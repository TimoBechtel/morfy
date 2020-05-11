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
   * css properties to copy over to target
   */
  effectedCssProperties: string[];
}

/**
 * Morph things
 */
export function morph(
  source: HTMLElement,
  target: HTMLElement,
  options: MorfyOptions
);
