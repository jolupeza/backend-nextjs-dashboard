import { CustomerModel } from "../models/Customer.js"
import {
  validateCustomer,
  validatePartialCustomer,
} from "../schemas/customers.js"

export class CustomerController {
  static async getAll(req, res, next) {
    try {
      const customers = await CustomerModel.getAll()

      res.json(customers)
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const result = validateCustomer(req.body)

      if (result.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", errors: result.error.errors })
      }

      const newCustomer = await CustomerModel.store({ input: result.data })

      res.status(201).json(newCustomer)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    const { id } = req.params

    try {
      const result = validatePartialCustomer(req.body)

      if (!result.success) {
        return res
          .status(400)
          .json({ message: "Invalid data", errors: result.error.errors })
      }

      const updatedCustomer = await CustomerModel.update({
        id,
        input: result.data,
      })

      res.status(201).json(updatedCustomer)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params

    try {
      const result = await CustomerModel.delete({ id })

      if (result === null) {
        res.status(404).json({ message: "Customer not found" })
      }

      res.status(204).json({ message: "Customer deleted successfully" })
    } catch (error) {
      next(error)
    }
  }
}
