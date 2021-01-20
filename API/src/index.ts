import mongoose from "mongoose"
import { app } from "./app"

import { ENDPOINT_URI, ADMIN_TOKEN } from './config';

const port = process.env.PORT || 3001
const mongoDbUri = process.env.MONGODB_URI || "mongodb+srv://root:Rb35gID3XMYOPz2k@ivr-syste-cluster.4ihwi.mongodb.net/test2"

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