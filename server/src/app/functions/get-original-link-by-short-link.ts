import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Result, succeed } from '@/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const getOriginalLinkByShortLinkInput = z.object({
  shortUrl: z.string(),
})

type GetOriginalLinkByShortLinkInput = z.input<
  typeof getOriginalLinkByShortLinkInput
>

export async function getOriginalLinkByShortLink(
  input: GetOriginalLinkByShortLinkInput
): Promise<Result<never, { originalUrl: string }>> {
  const { shortUrl } = getOriginalLinkByShortLinkInput.parse(input)

  const link = await db
    .select({
      originalUrl: schema.links.originalUrl,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (link.length === 0) {
    throw new Error('Link not found')
  }

  await db
    .update(schema.links)
    .set({
      accessNumber: sql`${schema.links.accessNumber} + 1`,
    })
    .where(eq(schema.links.shortUrl, shortUrl))

  return succeed({ originalUrl: link[0].originalUrl })
}
