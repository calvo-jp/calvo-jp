import coalesce from './coalesce';
import config from './config';
import Validator from './validator';

const errors = config.error.boolean;

class BooleanValidator extends Validator<boolean> {
  falsy(message?: string) {
    this.validators.push([this.isFalsy, coalesce(message, errors.falsy)]);
    return this;
  }

  truthy(message?: string) {
    this.validators.push([this.isTruthy, coalesce(message, errors.truthy)]);
    return this;
  }

  strict(message?: string) {
    const fn = (subject: any) => typeof subject === 'boolean';
    this.validators.unshift([fn, coalesce(message, errors.strict)]);
    return this;
  }

  /**
   * @example
   * validator.boolean().falsy().validate("false") // true
   * validator.boolean().falsy().strict().validate("false") // false
   */
  validate(subject: any) {
    subject = this.pipes.reduce((v, fn) => fn(v), subject);

    if (this.shouldSkip(subject)) return true;
    if (!this.validateRequired(subject)) return false;

    subject = this.middlewares.reduce((v, fn) => fn(v), subject);

    for (const [validate] of this.validators)
      if (!validate(subject)) return false;

    return this.parse(subject);
  }

  validateOrFail(subject: any) {
    subject = this.pipes.reduce((v, fn) => fn(v), subject);

    if (this.shouldSkip(subject)) return subject as undefined;

    this.validateRequiredOrFail(subject);

    subject = this.middlewares.reduce((v, fn) => fn(v), subject);

    for (const [validate, error] of this.validators)
      if (!validate(subject)) throw error;

    return this.parse(subject);
  }

  private isTruthy(subject: any): subject is true {
    // typical
    if (typeof subject === 'boolean') return subject;
    // string
    if (typeof subject === 'string') return /(true|on|1|yes)/i.test(subject);
    // number
    if (typeof subject === 'number' && subject === 1) return true;
    // function
    if (typeof subject === 'function') return this.isTruthy(subject());

    return false;
  }

  private isFalsy(subject: any): subject is false {
    // typical
    if (typeof subject === 'boolean') return subject;
    // string
    if (typeof subject === 'string') return /(false|off|0|no)/i.test(subject);
    // number
    if (typeof subject === 'number' && subject === 0) return true;
    // function
    if (typeof subject === 'function') return this.isFalsy(subject());

    return false;
  }

  private parse(subject: any) {
    return this.isTruthy(subject);
  }
}

export default BooleanValidator;
