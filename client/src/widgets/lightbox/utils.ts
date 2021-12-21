const isNumeric = (subject: any) =>
  typeof subject === "string" && /^[0-9]+$/g.test(subject);

const getZIndex = (elem: Element) => getComputedStyle(elem).zIndex;

/** parses string to int without returning NaN */
const safeParseInt = (str: string) => parseInt(str, Infinity);

export const getHighestZIndex = () => {
  const elems = document.getElementsByTagName("*");

  const list = Array.from(elems)
    .map(getZIndex)
    .filter(isNumeric)
    .map(safeParseInt);

  switch (list.length) {
    case 0:
      return 1;
    case 1:
      return list[0];
    default:
      return Math.max(...list);
  }
};

export const applyHighestZIndex = (element: HTMLElement) => {
  element.style.zIndex = (getHighestZIndex() + 1).toString();
};

export const isOnTopOfAllElems = (element: HTMLElement) => {
  const elems = document.getElementsByName("*");
  const zIndex = safeParseInt(element.style.zIndex);

  for (const elem of Array.from(elems)) {
    if (safeParseInt(elem.style.zIndex) > zIndex) {
      return false;
    }
  }

  return true;
};
