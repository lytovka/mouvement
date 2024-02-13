import { z } from 'zod'

export const MovementResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().nullable(),
  images: z.array(z.object({ id: z.string(), altText: z.string() }))
})

export const MovementsResultSchema = z.array(MovementResultSchema)
