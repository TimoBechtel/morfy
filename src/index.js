const calcTransformation = (source, target) => {
  return {
    x: source.offsetLeft - target.offsetLeft,
    y: source.offsetTop - target.offsetTop,
    scaleY: target.offsetHeight / source.offsetHeight,
    scaleX: target.offsetWidth / source.offsetWidth,
  };
};

const getEffectedStyles = (element, properties) => {
  const computedStyle = window.getComputedStyle(element);
  return properties.reduce((styles, prop) => {
    styles[prop] = computedStyle[prop];
    return styles;
  }, {});
};

export const createMorphable = (
  source,
  target,
  {
    duration = 1,
    timingFunction = '',
    effectedCssProperties = ['background-color', 'border-radius', 'border'],
  } = {}
) => {
  const targetStyles = getEffectedStyles(target, effectedCssProperties);
  const sourceStyles = getEffectedStyles(source, effectedCssProperties);
  const transformation = calcTransformation(source, target);

  source.innerHTML = `<div>${source.innerHTML}</div>`;
  const contentWrapper = source.children[0];

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
        (prop) => (source.style[prop] = targetStyles[prop])
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
        (prop) => (source.style[prop] = sourceStyles[prop])
      );

      contentWrapper.style.opacity = '1';

      target.style.opacity = '0';
      target.style.visibility = 'hidden';
    },
  };
};

export const morph = (source, target, options) => {
  createMorphable(source, target, options).morph();
};
