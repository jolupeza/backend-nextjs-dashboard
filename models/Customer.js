import { Schema, model } from "mongoose"

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

  static async store(input) {
    const customer = new Customer(input)
    const savedCustomer = await customer.save()
    return savedCustomer
  }

  static async delete({ id }) {
    const result = await Customer.findByIdAndDelete(id)

    return result
  }
}
