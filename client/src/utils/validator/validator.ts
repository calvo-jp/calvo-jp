import coalesce from './coalesce';
import config from './config';

type ValidatorFn<T> = (subject: T, message?: string) => boolean;
type Middleware<T> = (subject: T) => T;
type CustomFn<T> = (subject: T) => boolean;
type PipeFn<T> = (subject: unknown) => T;

class Validator<T> {
  protected middlewares: Middleware<T>[];
  protected validators: [ValidatorFn<T>, string][];
  protected pipes: PipeFn<T>[];
  protected required: boolean;
  protected requiredError: string;
  protected constructError?: string;

  constructor(message?: string) {
    this.pipes = [];
    this.validators = [];
    this.middlewares = [];
    this.required = true;
    this.requiredError = config.error.required;
    this.constructError = message;
  }

  /**
   * @description adds a custom validators
   * @example validator.string().fn(emailValidator).validate(<subject>)
   */
  fn(custom: CustomFn<T>, message?: string) {
    this.validators.push([custom, coalesce(message, config.error.main)]);
    return this;
  }

  /**
   * @description adds a custom validator and prioritize it
   * @example validator.string().fnx(runThisFirst).validate(<subject>)
   */
  fnx(custom: CustomFn<T>, message?: string) {
    this.validators.unshift([custom, coalesce(message, config.error.main)]);
    return this;
  }

  optional(message?: string) {
    this.required = false;
    this.requiredError = coalesce(message, this.requiredError);
    return this;
  }

  pipe(fn: PipeFn<T>) {
    this.pipes.push(fn);
    return this;
  }

  middleware(fn: Middleware<T>) {
    this.middlewares.push(fn);
    return this;
  }

  /** general validations eg. required are done here */
  protected validate(subject: any) {
    if (this.required && subject === 'undefined') throw this.requiredError;
  }
}

export default Validator;
