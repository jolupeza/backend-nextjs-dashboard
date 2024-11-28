import { RevenueModel } from "../models/Revenue.js"

export class RevenueController {
  static async getAll(req, res) {
    const revenues = await RevenueModel.getAll()

    res.json(revenues)
  }

  static async store(req, res) {
    const newRevenue = await RevenueModel.store()

    return res.status(201).json(newRevenue)
  }
}
