import jwt from "jsonwebtoken";

export const createToken = async (email: any) => {
  const payload = {
    data: email,
  };
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET as string,
      // "kVt955sFd2UgVBZE3TaeifFUwE9VZFKX",
      { expiresIn: "300000" },

      (err: any, token: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
