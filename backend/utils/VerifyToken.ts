// import jwt from "jsonwebtoken";

// export default function tokenIsVerify(token: string) {
//   return jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
//     if (err) {
//       throw new Error(err.message);
//     } else {
//       console.log(decoded);
//       return decoded as string;
//     }
//     // });
//   });
// }

import jwt, { JwtPayload } from "jsonwebtoken";

export default async function tokenIsVerify(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET as string, (err, decoded: any) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        // console.log(decoded.data);
        resolve(decoded?.data);
      }
    });
  });
}
