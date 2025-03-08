import { Schema, model } from "mongoose"

const invoiceSchema = new Schema(
  {
    amount: Number,
    status: String,
    date: Date,
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  },
)

invoiceSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Invoice = model("Invoice", invoiceSchema)

export class InvoiceModel {
  static async getAll({ per_page }) {
    return Invoice.find()
      .sort({ date: -1 })
      .populate("customer")
      .limit(per_page)
  }

  static async store(input) {
    const invoice = new Invoice(input)
    const savedInvoice = await invoice.save()
    return savedInvoice
  }

  static async delete({ id }) {
    const result = await Invoice.findByIdAndDelete(id)

    return result
  }
}
