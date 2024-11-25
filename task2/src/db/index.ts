import mongoose from "mongoose";

export default async () => {
  try {
    const DBConnection = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`☘️ Connected to ${DBConnection.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
