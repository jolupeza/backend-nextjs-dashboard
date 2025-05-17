import z from "zod"

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image_url: z.string(),
})

export function validateCustomer(input) {
  return customerSchema.safeParse(input)
}

export function validatePartialCustomer(input) {
  return customerSchema.partial().safeParse(input)
}
