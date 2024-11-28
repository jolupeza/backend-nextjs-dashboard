import { Schema, model } from "mongoose"

const revenueSchema = new Schema({
  month: String,
  revenue: Number,
})

revenueSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    ;(returnedObject.id = returnedObject._id), delete returnedObject._id
    delete returnedObject.__v
  },
})

const Revenue = model("Revenue", revenueSchema)

export class RevenueModel {
  static async getAll() {
    return Revenue.find({})
  }

  static async store() {
    const revenue = new Revenue({ month: "Dec", revenue: 4800 })

    const savedRevenue = await revenue.save()

    return savedRevenue
  }
}
