import { InvoiceModel } from "../models/Invoice.js"

export class InvoiceController {
  static async getAll(req, res) {
    const per_page = req.query.per_page || 10

    try {
      const invoices = await InvoiceModel.getAll({ per_page })

      res.json(invoices)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async store(req, res) {
    try {
      const newInvoice = await InvoiceModel.store(req.body)

      res.status(201).json(newInvoice)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const result = await InvoiceModel.delete({ id })

      if (result === null) {
        res.status(404).json({ message: "Invoice not found" })
      }

      res.status(204).json({ message: "Invoice deleted successfully" })
    } catch (error) {
      throw new Error(error)
    }
  }
}
