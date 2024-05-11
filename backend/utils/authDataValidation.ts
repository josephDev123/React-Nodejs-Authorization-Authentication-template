import Joi from "joi";

export const registercredentialValidation = async (
  name?: string,
  email?: string,
  password?: number | string
) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(30)
        .pattern(/^[a-zA-Z\s]+$/)
        .trim()
        .required(),
      password: Joi.string()
        .min(8)
        .max(15)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .message(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        )
        .required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });

    return schema.validate({ name, password, email });
  } catch (error) {
    throw new Error("Validation error: " + (error as Error).message);
  }
};
