import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  registerNumber: z.number(),
  letterNumber: z.string(),
  letterDate: z.string(),
  title: z.string(),
  address: z.string(),
  pdfUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
