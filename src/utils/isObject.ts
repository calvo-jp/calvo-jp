/** checks whether subject is a javascript object */
const isObject = (subject: any): subject is Record<string, any> =>
  Object(subject) === subject &&
  Object.prototype.toString.call(subject) === "[object Object]";

export default isObject;
