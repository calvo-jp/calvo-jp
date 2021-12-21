import * as yup from "yup";

const schema = yup.object().shape({
  NODE_ENV: yup
    .string()
    .trim()
    .lowercase()
    .oneOf(["development", "production"])
    .default("production"),
  DEBUG: yup.bool().default(function () {
    return yup
      .string()
      .equals(["development"])
      .isValidSync(process.env.NODE_ENV);
  }),
  REDIS_URL: yup.string().trim().lowercase().required(),
});

const globalConfig = schema.validateSync(process.env, {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: false,
});

export default globalConfig;
