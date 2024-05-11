import Joi from "joi";

// Define the validation schema for the username
const usernameSchema = Joi.string().alphanum().min(3).max(30).required();

// Function to validate a username
function validateUsername(username: string) {
  const { error, value } = usernameSchema.validate(username);
  return error ? error.details[0]?.message : null;
}
