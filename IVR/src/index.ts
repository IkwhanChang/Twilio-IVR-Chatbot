import mongoose from "mongoose"
import { app } from "./app"
import { MONGODB_URI, PORT } from "./config";


const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error)
  }

  app.listen(PORT, () => {
    console.log(`IVRobot listening at http://localhost:${PORT}`)
  })
}

start()