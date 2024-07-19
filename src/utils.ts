// @todo handle other css units as needed
export const getComputedCustomProperty = (
  name: string,
  element: HTMLElement = document.documentElement
): number => {
  const fontSize = parseInt(
    getComputedStyle(document.documentElement).fontSize,
    10
  );
  const value = getComputedStyle(element).getPropertyValue(name);

  if (value.endsWith("rem")) {
    return parseFloat(value) * fontSize;
  }

  return 0;
};
