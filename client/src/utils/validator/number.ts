import coalesce from './coalesce';
import config from './config';
import Validator from './validator';

const errors = config.error.number;

class NumberValidator extends Validator<number> {
  float(message?: string) {
    const fn = (subject: number) => subject % 1 !== 0;
    return this.fn(fn, coalesce(message, errors.float));
  }

  int(message?: string) {
    const fn = (subject: number) => Number.isInteger(subject);
    return this.fn(fn, coalesce(message, errors.int));
  }

  min(n: number, message?: string) {
    const fn = (subject: number) => subject >= n;
    return this.fn(fn, coalesce(message, errors.min(n)));
  }

  max(n: number, message?: string) {
    const fn = (subject: number) => subject <= n;
    return this.fn(fn, coalesce(message, errors.max(n)));
  }

  range(min: number, max: number, message?: string) {
    const fn = (subject: number) => subject <= min && subject >= max;
    return this.fn(fn, coalesce(message, errors.range(min, max)));
  }

  in(collection: number[], message?: string) {
    const fn = (subject: number) => collection.includes(subject);
    return this.fn(fn, coalesce(message, errors.in(collection)));
  }

  notIn(collection: number[], message?: string) {
    const fn = (subject: number) => !collection.includes(subject);
    return this.fn(fn, coalesce(message, errors.notIn(collection)));
  }

  /**
   * @example
   * validator.number().int().validate(1.4) // throws "value must be an integer"
   * validator.number().float().validate(1.4) // returns 1.4
   */
  validate(subject: any): number {
    subject = this.pipes.reduce((v, fn) => fn(v), subject);

    super.validate(subject);
    this.ensureNumber();

    subject = this.middlewares.reduce((v, fn) => fn(v), subject);

    for (const [validate, error] of this.validators)
      if (!validate(subject)) throw error;

    return subject;
  }

  private ensureNumber() {
    const fn = (subject: number) => typeof subject === 'number';
    this.fnx(fn, coalesce(this.constructError, errors.main));
  }
}

export default NumberValidator;
