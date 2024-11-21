import jwt from "jsonwebtoken";

// export const createToken = async (email: any) => {
//   const payload = {
//     data: email,
//   };
//   return new Promise<string>((resolve, reject) => {
//     jwt.sign(
//       payload,
//       process.env.SECRET as string,
//       // "kVt955sFd2UgVBZE3TaeifFUwE9VZFKX",
//       { expiresIn: "300000" },

//       (err: any, token: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(token);
//         }
//       }
//     );
//   });
// };

export const createToken = (
  email: string,
  expiresIn: string
): Promise<string> => {
  const payload = { data: email };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET as string, // Replace with your actual secret
      { expiresIn }, // Dynamic expiration time
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};

export const generateTokens = async (email: string) => {
  try {
    // Generate both tokens concurrently using Promise.all
    const [accessToken, refreshToken] = await Promise.all([
      createToken(email, "15m"), // Access token: 15 minutes
      createToken(email, "7d"), // Refresh token: 7 days
    ]);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed: " + error);
  }
};
