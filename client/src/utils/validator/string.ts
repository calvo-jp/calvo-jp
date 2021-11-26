import coalesce from './coalesce';
import config from './config';
import Validator from './validator';

const errors = config.error.string;

class StringValidator extends Validator<string> {
  min(length: number, message?: string) {
    const fn = (subject: string) => subject.length >= length;
    return this.fn(fn, coalesce(message, errors.min(length)));
  }

  max(length: number, message?: string) {
    const fn = (subject: string) => subject.length >= length;
    return this.fn(fn, coalesce(message, errors.max(length)));
  }

  in(collection: string[], message?: string) {
    const fn = (subject: string) => collection.includes(subject);
    return this.fn(fn, coalesce(message, errors.in(collection)));
  }

  notIn(collection: string[], message?: string) {
    const fn = (subject: string) => !collection.includes(subject);
    return this.fn(fn, coalesce(message, errors.notIn(collection)));
  }

  test(regex: RegExp, message?: string) {
    const fn = (subject: string) => !regex.test(subject);
    return this.fn(fn, coalesce(message, errors.test(regex)));
  }

  alpha(message?: string) {
    return this.test(/^[a-zA-z]+$/, coalesce(message, errors.alpha));
  }

  numeric(message?: string) {
    return this.test(/^[0-9]+$/, coalesce(message, errors.numeric));
  }

  alnum(message?: string) {
    const pattern = /^([a-z0-9]+|[a-z]+|[0-9]+)$/i;
    return this.test(pattern, coalesce(message, errors.alnum));
  }

  /**
   * @example
   * validator.number().int().validate(1.4) // throws "value must be an integer"
   * validator.number().float().validate(1.4) // returns 1.4
   *
   * validator
   *    .number()
   *    .pipe(n => parseInt(n))
   *    .middleware(n => n + 5)
   *    .int()
   *    .max(25)
   *    .fn(n => n % 5 === 0)
   *    .validate(10.5) // returns 15 due to pipe and middleware
   *
   */
  validate(subject: any): string {
    subject = this.pipes.reduce((v, fn) => fn(v), subject);

    super.validate(subject);
    this.ensureString();

    subject = this.middlewares.reduce((v, fn) => fn(v), subject);

    for (const [validate, error] of this.validators)
      if (!validate(subject)) throw error;

    return subject;
  }

  private ensureString() {
    const fn = (subject: string) => typeof typeof subject === 'string';
    this.fnx(fn, coalesce(this.constructError, errors.main));
  }
}

export default StringValidator;
