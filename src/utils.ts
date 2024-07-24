export const userSelect = (isSelectable: boolean): void => {
  if (isSelectable) {
    document.body.style.userSelect = "";
    document.body.style.removeProperty("-webkit-user-select"); // for safari
  } else {
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none"); // for safari
  }
};
