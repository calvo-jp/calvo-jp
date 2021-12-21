import isObject from "./isObject";

/** deeply removes falsy values in object or array of objects */
const cleanValues = (subject: any): any => {
  if (Array.isArray(subject)) return subject.map(cleanValues);
  if (isObject(subject)) return cleanObject(subject);
  return subject;
};

const isFalsy = (subject: any) =>
  subject === null || (typeof subject === "string" && subject.trim() === "");

const cleanObject = (subject: Record<string, any>) => {
  const values: Record<string, any> = {};

  for (const [key, value] of Object.entries(subject)) {
    if (!isFalsy(value)) values[key] = cleanValues(value);
  }

  return values;
};

export default cleanValues;
