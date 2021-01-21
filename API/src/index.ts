import mongoose from "mongoose"
import { app } from "./app"

import { PORT , MONGODB_URI} from './config';

const port = PORT
const mongoDbUri = MONGODB_URI

const start = async () => {
  try {
    await mongoose.connect(mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error)
  }

  app.listen(port, () => {
    console.log(`IVRobot endpoint listening at http://localhost:${port}`)
  })
}

start()