import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date",
  }),
})