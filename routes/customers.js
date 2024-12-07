import { Router } from "express"
import { CustomerController } from "../controllers/customers.js"

export const customersRouter = Router()

customersRouter.get("/", CustomerController.getAll)
customersRouter.post("/", CustomerController.store)
customersRouter.delete("/:id", CustomerController.delete)
