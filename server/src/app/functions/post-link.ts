import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Result, succeed } from '@/shared/either'
import { z } from 'zod'

const postLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string(),
})

type PostLinkInput = z.input<typeof postLinkInput>

export async function postLink(
  input: PostLinkInput
): Promise<Result<never, { message: string }>> {
  const { originalUrl, shortUrl } = postLinkInput.parse(input)

  await db.insert(schema.links).values({
    originalUrl: originalUrl,
    shortUrl: shortUrl,
  })

  return succeed({ message: 'Link added' })
}
