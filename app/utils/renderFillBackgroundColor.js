/* eslint-disable no-bitwise */
import { colors } from './generateColors';

export const convertHexToRGBA = (hex, opacity = 1) => {
  let color;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = `0x${color.join('')}`;
    return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex');
};

export const createFillHachure = (index) => {
  const numberStripes = 10;
  const step = numberStripes / 100;
  const stripeStrings = [];
  for (let i = 0; i < numberStripes; i += 1) {
    const isTranslucid = i % 2 === 0;
    const opacity = isTranslucid ? 0.8 : 1;
    const currentStep = step * (i + 1);
    const beforeStep = step * i;
    const currentColor = convertHexToRGBA(colors[index], opacity);
    const stripeString = `${beforeStep}:${currentColor} ${currentStep}:${currentColor}`;
    stripeStrings.push(stripeString);
  }
  const angle = 140;
  const stringToStripes = stripeStrings.join(' ');
  return `l (${angle}) ${stringToStripes}`;
};

const renderFillBackgroundColor = (applicationId, type) => {
  const index = applicationId - 1;
  if (
    type === 'eggsConsumption' ||
    type === 'eggsDistribution' ||
    type === 'type'
  ) {
    return colors[index];
  }
  return createFillHachure(index);
};

export default renderFillBackgroundColor;
