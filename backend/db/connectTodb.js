import mongoose from "mongoose";

const connectTodb = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting with URI:", uri); 

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
  }
};

export default connectTodb;
