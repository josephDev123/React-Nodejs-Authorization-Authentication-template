import * as bcrypt from "bcrypt";

export async function hashPassword(passwordToHash: string | number) {
  const myPassword: string = passwordToHash as string;
  const saltRounds: number = 10;

  try {
    const hashedPassword = await bcrypt.hash(myPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
