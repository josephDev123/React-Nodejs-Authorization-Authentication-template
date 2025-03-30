import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/Users";

export const googleStrategyConf = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.CALLBACKURL as string, // Backend URL
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await UserModel.findOne({
      $or: [{ googleId: profile.id }, { email: profile._json.email }],
    });
    console.log("user:", user);
    console.log("profile:", profile);
    if (!user) {
      user = new UserModel({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        authenticated: profile._json.email_verified,
      });
      await user.save();
    }
    return done(null, user);
  }
);
