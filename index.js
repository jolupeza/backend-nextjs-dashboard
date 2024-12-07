import { connection } from "./config/database.js"
import express, { json } from "express"
import { revenuesRouter } from "./routes/revenues.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { customersRouter } from "./routes/customers.js"
import { notFound } from "./middlewares/notFound.js"
import { handleErrors } from "./middlewares/handleErrors.js"

connection()

const app = express()
app.use(json())
app.disable("x-powered-by")

app.use("/revenues", revenuesRouter)
app.use("/customers", customersRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on ${PORT} http://localhost:${PORT}`)
})
