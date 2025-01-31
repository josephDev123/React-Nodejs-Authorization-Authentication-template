// declare module "passport-google-oidc" {
//   import { Strategy as PassportStrategy } from "passport";
//   import { Request } from "express";

//   interface Profile {
//     id: string;
//     displayName: string;
//     name?: {
//       familyName: string;
//       givenName: string;
//     };
//     emails?: { value: string }[];
//     photos?: { value: string }[];
//   }

//   type VerifyFunction = (
//     issuer: string,
//     profile: Profile,
//     cb: (error: any, user?: any) => void
//   ) => void;

//   class Strategy extends PassportStrategy {
//     constructor(
//       options: {
//         clientID: string;
//         clientSecret: string;
//         callbackURL: string;
//         passReqToCallback?: boolean;
//       },
//       verify: VerifyFunction
//     );
//   }

//   export { Strategy };
// }
