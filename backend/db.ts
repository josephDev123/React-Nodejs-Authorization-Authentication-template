import mongoose from "mongoose";

// export const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//     console.log("db connection successful");
//   } catch (error) {
//     throw error;
//   }
// };

export class DbConfig {
  constructor(private readonly url: string) {
    this.url = url;
  }

  async connect() {
    try {
      await mongoose.connect(this.url);
      console.log("db connection successful");
    } catch (error) {
      throw error;
    }
  }
}
