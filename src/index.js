const calcTransformation = (source, target) => {
  return {
    x: source.offsetLeft - target.offsetLeft,
    y: source.offsetTop - target.offsetTop,
    scaleY: target.offsetHeight / source.offsetHeight,
    scaleX: target.offsetWidth / source.offsetWidth,
  };
};

export const morph = (
  source,
  target,
  {
    duration = 1,
    timingFunction = '',
    effectedCssProperties = ['background', 'border', 'border-radius'],
  } = {}
) => {
  source.innerHTML = `<div>${source.innerHTML}</div>`;
  const contentWrapper = source.children[0];

  const transformation = calcTransformation(source, target);
  const targetStyles = window.getComputedStyle(target);

  source.style.transformOrigin = 'top left';
  source.style.transition = `${['transform', ...effectedCssProperties].join(
    ` ${duration}s ${timingFunction},`
  )}, opacity ${duration}s ${duration * 1.5}s`;

  source.style.transform = `translate(${-transformation.x}px, ${-transformation.y}px) scale(${
    transformation.scaleX
  }, ${transformation.scaleY})`;
  source.style.opacity = '0';
  effectedCssProperties.forEach(
    (prop) => (source.style[prop] = targetStyles[prop])
  );

  contentWrapper.style.transition = `opacity ${
    duration * 0.5
  }s ${timingFunction}`;
  contentWrapper.style.opacity = '0';

  target.style.transition = `opacity ${duration}s ${duration}s`;
  target.style.opacity = '1';
};
