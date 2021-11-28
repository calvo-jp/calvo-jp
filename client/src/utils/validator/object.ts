import BooleanValidator from './boolean';
import coalesce from './coalesce';
import NumberValidator from './number';
import StringValidator from './string';

interface Schema {
  [key: string]: NumberValidator | StringValidator | BooleanValidator;
}

type Subject<T extends {}> =
  | Partial<Record<keyof T, any>> & Record<string, any>;

type Result<T extends Schema> = {
  errors: { [_ in keyof T]?: string };

  /** validated and posibly parsed values */
  values: { [P in keyof T]?: ReturnType<T[P]['validate']> };
};

class ObjectValidator<T extends Schema> {
  constructor(private schema: T) {}

  validate(subject: Subject<T>): Result<T> {
    const result: Result<T> = {
      errors: {},
      values: {},
    };

    if (!isObject(subject)) throw 'Subject must be an object';

    for (const [k, fn] of Object.entries(this.schema)) {
      try {
        // @ts-ignore
        result.values[k] = fn.validateOrFail(subject[k]);
      } catch (e) {
        // @ts-ignore
        result.errors[k] = e;
      }
    }

    return result;
  }

  static __new__<T extends Schema>(schema: T) {
    return new ObjectValidator(schema);
  }
}

const isObject = (o: any): o is Record<string, any> =>
  Object(o) === o && Object.prototype.toString.call(o) === '[object Object]';

export default ObjectValidator;
