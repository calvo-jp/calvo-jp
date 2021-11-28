import BooleanValidator from './boolean';
import NumberValidator from './number';
import ObjectValidator from './object';
import StringValidator from './string';

const validator = {
  schema: ObjectValidator.__new__,
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
};

export default validator;
