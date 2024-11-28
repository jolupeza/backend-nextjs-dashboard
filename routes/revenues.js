import { Router } from "express"
import { RevenueController } from "../controllers/revenues.js"

export const revenuesRouter = Router()

revenuesRouter.get("/", RevenueController.getAll)
revenuesRouter.post("/", RevenueController.store)
