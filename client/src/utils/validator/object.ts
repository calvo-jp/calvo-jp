import BooleanValidator from './boolean';
import NumberValidator from './number';
import StringValidator from './string';

interface Schema {
  [key: string]: NumberValidator | StringValidator | BooleanValidator;
}

type Result<T extends Schema> = {
  errors: { [_ in keyof T]?: string };
  values: { [P in keyof T]?: ReturnType<T[P]['validate']> };
};

class ObjectValidator {
  validate<T extends Schema>(subject: T, data: unknown) {
    const result: Result<T> = {
      errors: {},
      values: {},
    };

    // codes...

    return result;
  }
}

const isObject = (o: any): o is {} =>
  Object(o) === o && Object.prototype.toString.call(o) === '[object Object]';

export default ObjectValidator;
