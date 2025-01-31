import "express-session";

declare module "express-session" {
  interface SessionData {
    token?: string; // Declare the custom `token` property
  }
}
