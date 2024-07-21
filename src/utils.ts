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

export const userSelect = (isSelectable: boolean): void => {
  if (isSelectable) {
    document.body.style.userSelect = "";
    document.body.style.removeProperty("-webkit-user-select"); // for safari
  } else {
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none"); // for safari
  }
};
