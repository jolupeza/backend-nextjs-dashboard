import { CustomerModel } from "../models/Customer.js"

export class CustomerController {
  static async getAll(req, res) {
    try {
      const customers = await CustomerModel.getAll()

      res.json(customers)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async store(req, res) {
    try {
      const newCustomer = await CustomerModel.store(req.body)

      res.status(201).json(newCustomer)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await CustomerModel.delete({ id })

      if (result === null) {
        res.status(404).json({ message: "Customer not found" })
      }

      res.status(204).json({ message: "Customer deleted successfully" })
    } catch (error) {
      throw new Error(error)
    }
  }
}
