import { Schema, model } from "mongoose"
import { NotFoundError } from "../exceptions/NotFoundError.js"

const customerSchema = new Schema({
  name: String,
  email: String,
  image_url: String,
})

customerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Customer = model("Customer", customerSchema)

export class CustomerModel {
  static async getAll() {
    return Customer.find({})
  }

  static async store({ input }) {
    const customer = new Customer(input)
    const savedCustomer = await customer.save()
    return savedCustomer
  }

  static async update({ id, input }) {
    return await Customer.findByIdAndUpdate(id, input)
  }

  static async delete({ id }) {
    return await Customer.findByIdAndDelete(id)
  }
}
