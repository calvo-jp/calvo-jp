interface PlainObject {
  [key: string]: any;
}

/** checks whether subject is a javascript object */
const isPlainObject = (subject: any): subject is PlainObject =>
  Object(subject) === subject &&
  Object.prototype.toString.call(subject) === "[object Object]";

export default isPlainObject;
