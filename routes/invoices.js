import { Router } from "express"
import { InvoiceController } from "../controllers/invoices.js"

export const invoicesRouter = Router()

invoicesRouter.get("/", InvoiceController.getAll)
invoicesRouter.post("/", InvoiceController.store)
invoicesRouter.delete("/:id", InvoiceController.delete)
