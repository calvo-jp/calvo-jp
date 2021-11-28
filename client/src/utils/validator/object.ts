import BooleanValidator from './boolean';
import NumberValidator from './number';
import StringValidator from './string';

interface Schema {
  [key: string]: NumberValidator | StringValidator | BooleanValidator;
}

type Subject<T> = Partial<Record<keyof T, any>> & Record<string, any>;

type Result<T extends Schema> = {
  errors: { [_ in keyof T]?: string };
  values: { [P in keyof T]?: ReturnType<T[P]['validate']> };
};

class ObjectValidator {
  validate<T extends Schema>(schema: T, subject: Subject<T>) {
    const result: Result<T> = {
      errors: {},
      values: {},
    };

    return result;
  }
}

const isObject = (o: any): o is Record<string, any> =>
  Object(o) === o && Object.prototype.toString.call(o) === '[object Object]';

export default ObjectValidator;
