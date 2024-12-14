export type User = {
  _id: string; // MongoDB ObjectId as a string
  name: string; // User's name
  email: string; // User's email
  password: string; // Hashed password
  authenticated: boolean; // Authentication status
  staging: number; // Numeric staging level
  //__v: number;             // Version key (used by Mongoose)
};
