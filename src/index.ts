import type { PropertiesHyphen } from 'csstype';

type StyleProperties = {
  [key in keyof PropertiesHyphen<string>]: string;
};

function calcTransformation(source: HTMLElement, target: HTMLElement) {
  return {
    x: source.offsetLeft - target.offsetLeft,
    y: source.offsetTop - target.offsetTop,
    scaleY: target.offsetHeight / source.offsetHeight,
    scaleX: target.offsetWidth / source.offsetWidth,
  };
}

function getEffectedStyles(
  element: HTMLElement,
  properties: (keyof StyleProperties)[]
): StyleProperties {
  const computedStyle = window.getComputedStyle(element);
  return properties.reduce((styles, prop) => {
    styles[prop] = computedStyle.getPropertyValue(prop);
    return styles;
  }, {} as StyleProperties);
}

export function createMorphable(
  source: HTMLElement,
  target: HTMLElement,
  {
    duration = 1,
    timingFunction = '',
    effectedCssProperties = ['background-color', 'border-radius', 'border'],
  }: MorfyOptions = {}
): Morphable {
  const targetStyles = getEffectedStyles(target, effectedCssProperties);
  const sourceStyles = getEffectedStyles(source, effectedCssProperties);
  const transformation = calcTransformation(source, target);

  source.innerHTML = `<div>${source.innerHTML}</div>`;
  const contentWrapper = source.children[0] as HTMLElement; // can be sure it is a HTMLElement as we created it before

  source.style.transformOrigin = 'top left';
  target.style.visibility = 'hidden';

  return {
    morph() {
      source.style.transition = `${['transform', ...effectedCssProperties].join(
        ` ${duration}s ${timingFunction},`
      )}, opacity ${duration}s ${duration * 1.5}s, visibility 0s ${
        duration * 1.5 + duration
      }s`;

      contentWrapper.style.transition = `opacity ${
        duration * 0.5
      }s ${timingFunction}`;

      target.style.transition = `opacity ${duration}s ${duration}s, visibility 0s ${duration}s`;

      source.style.transform = `translate(${-transformation.x}px, ${-transformation.y}px) scale(${
        transformation.scaleX
      }, ${transformation.scaleY})`;
      source.style.opacity = '0';
      source.style.visibility = 'hidden';

      effectedCssProperties.forEach(
        (prop) =>
          targetStyles[prop] !== undefined &&
          source.style.setProperty(prop, targetStyles[prop] as string)
      );

      contentWrapper.style.opacity = '0';

      target.style.opacity = '1';
      target.style.visibility = 'visible';
    },
    revert() {
      source.style.transition = `${['transform', ...effectedCssProperties].join(
        ` ${duration}s ${duration * 0.2}s ${timingFunction},`
      )}, opacity 0s, visibility 0s`;

      contentWrapper.style.transition = `opacity ${duration}s ${
        duration * 0.5
      }s ${timingFunction}`;

      target.style.transition = `opacity ${duration * 0.2}s, visibility 0s ${
        duration * 0.2
      }s`;

      source.style.transform = `translate(0px, 0px) scale(1, 1)`;
      source.style.opacity = '1';
      source.style.visibility = 'visible';

      effectedCssProperties.forEach(
        (prop) =>
          sourceStyles[prop] !== undefined &&
          source.style.setProperty(prop, sourceStyles[prop] as string)
      );

      contentWrapper.style.opacity = '1';

      target.style.opacity = '0';
      target.style.visibility = 'hidden';
    },
  };
}

export function morph(
  source: HTMLElement,
  target: HTMLElement,
  options: MorfyOptions
) {
  createMorphable(source, target, options).morph();
}

interface MorfyOptions {
  /**
   * duration in seconds
   */
  duration?: number;
  /**
   * css timing function
   * @example 'ease-in'
   */
  timingFunction?: PropertiesHyphen['transition-timing-function'];
  /**
   * css properties to be transitioned from source to target
   */
  effectedCssProperties?: (keyof StyleProperties)[];
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
