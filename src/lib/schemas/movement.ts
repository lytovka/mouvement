import { z } from 'zod'

export const MovementResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().nullable(),
  images: z.array(z.object({ id: z.string(), altText: z.string() }))
})

export const MovementsResultSchema = z.object({
  movements: z.array(MovementResultSchema)
})

export const ImageSchema = z.object({ altText: z.string(), src: z.string() })

export const ImagesSchema = z.array(ImageSchema)

export const MovementMarkdownResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  images: ImagesSchema
})

export const MovementsMarkdownResultSchema = z.object({
  movements: z.array(MovementMarkdownResultSchema)
})
