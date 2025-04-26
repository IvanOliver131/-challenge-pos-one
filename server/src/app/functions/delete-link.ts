import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Result, succeed } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const deleteLinkInput = z.object({
  id: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Result<never, { message: string }>> {
  const { id } = deleteLinkInput.parse(input)

  await db.delete(schema.links).where(eq(schema.links.id, id))

  return succeed({ message: 'Link deleted' })
}
