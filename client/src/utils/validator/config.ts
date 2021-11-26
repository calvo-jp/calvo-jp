const config = {
  /**
   * @description default errors
   */
  error: {
    main: 'validation failed',
    required: 'value is required',
    number: {
      main: 'value must be a number',
      int: 'value must be an integer',
      float: 'value must be a float',
      range: (min: number, max: number) => {
        return `value must be within ${min} and ${max}`;
      },
      min(length: number) {
        return `value must be more than or equals to ${length}`;
      },
      max(length: number) {
        return `value must be lesser or equals to ${length}`;
      },
      in(collection: number[]) {
        return `value must be one of ${collection.join()}`;
      },
      notIn(collection: number[]) {
        return `value must not be one of ${collection.join()}`;
      },
    },
    string: {
      main: 'value must be a string',
      min(length: number) {
        return `characters must be more than or equals to ${length}`;
      },
      max(length: number) {
        return `characters must be lesser than or equals to ${length}`;
      },
      in(collection: string[]) {
        return `value must be one of ${collection.join()}`;
      },
      notIn(collection: string[]) {
        return `value must not be one of ${collection.join()}`;
      },
      alpha: 'only letters are allowed',
      numeric: 'only numbers are allowed',
      alnum: 'only letters and numbers are allowed',
      test(pattern: RegExp) {
        return `value does not match the pattern '${pattern}'`;
      },
    },
    boolean: {
      main: 'value must be a boolean',
      falsy: 'value must mean false',
      truthy: 'value must mean true',
      strict: 'value must be a boolean true or false',
    },
    object: 'value must be an object',
  },
};

export default config;
