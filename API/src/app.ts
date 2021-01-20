import express from "express"
import { json, urlencoded } from "body-parser"
import cors from "cors"
import "express-async-errors"

import cookieParser from "cookie-parser"

import { errorHandler } from "./middleware/error-handler"
import { getResponseRouter } from "./routes/getResponse"
import { authRouter } from "./routes/auth"
import { merchantRouter } from "./routes/merchant"
import { customerRouter } from "./routes/customer"

const app = express()


app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }));


// Routers
app.use(authRouter)
app.use(getResponseRouter)
app.use(merchantRouter)
app.use(customerRouter)


app.all("*", async (req, res) => {
  res.status(404).send({ errors: [{ message: "pages not found" }] })
})

app.use(errorHandler)

export { app }