import BooleanValidator from './boolean';
import NumberValidator from './number';
import ObjectValidator from './object';
import StringValidator from './string';

interface Validator {
  string: () => StringValidator;
  number: () => NumberValidator;
  object: () => ObjectValidator;
  boolean: () => BooleanValidator;
}

const validator: Validator = {
  object: () => new ObjectValidator(),
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
};

export default validator;
