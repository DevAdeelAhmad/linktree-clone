import * as z from "zod"
import { CompletePageLink, relatedPageLinkSchema } from "./index"

export const pageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  public: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePage extends z.infer<typeof pageSchema> {
  pageLinks: CompletePageLink[]
}

/**
 * relatedPageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageSchema: z.ZodSchema<CompletePage> = z.lazy(() => pageSchema.extend({
  pageLinks: relatedPageLinkSchema.array(),
}))
