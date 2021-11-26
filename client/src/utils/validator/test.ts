import validator from './index';

const result = validator.object().validate(
  {
    age: validator.number().min(18).max(60).optional(),
    name: validator.string().min(5).max(25).optional(),
    email: validator.string().min(5).max(25),
    password: validator.string().min(5).max(100),
    acceptedTerms: validator.boolean().truthy(),
  },
  {
    username: 'calvojp',
    password: 'Oct121992*',
    acceptedTerms: true,
  }
);

console.log(result.errors);
console.log(result.values);
