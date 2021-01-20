import express from "express"
import { json, urlencoded } from "body-parser"
import cors from "cors"
import "express-async-errors"

import cookieSession from "cookie-session"

import { errorHandler } from "./middleware/error-handler"
import { inqueryRouter } from "./routes/inquery"
import { registerRouter } from "./routes/register"
import { voiceRouter } from "./routes/voice"
import { welcomeRouter } from "./routes/welcome"
import { initialize } from "./initialize"

const app = express()

app.use(urlencoded({ extended: false }));

app.use(voiceRouter)
app.use(welcomeRouter)
// app.use(registerRouter)
// app.use(inqueryRouter)

initialize();

app.all("*", async (req, res) => {
  res.status(404).send({ errors: [{ message: "pages not found" }] })
})

app.use(errorHandler)

export {app}