import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Result, succeed } from '@/shared/either'
import { ilike } from 'drizzle-orm'
import { stringify } from 'csv-stringify'
import { z } from 'zod'
import { pipeline } from 'node:stream/promises'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { PassThrough, Transform } from 'node:stream'

const exportLinksInput = z.object({
  searchQuery: z.string().optional(),
})

type ExportLinksInput = z.input<typeof exportLinksInput>
type ExportLinksOutput = {
  linksCsvUrl: string
}

export async function exportLinks(
  input: ExportLinksInput
): Promise<Result<never, ExportLinksOutput>> {
  const { searchQuery } = exportLinksInput.parse(input)

  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessNumber: schema.links.accessNumber,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(
      searchQuery ? ilike(schema.links.shortUrl, `%${searchQuery}%`) : undefined
    )
    .toSQL()

  // CURSOR - Retorna os dados de pouco a pouco até chegar no final
  const cursor = pg.unsafe(sql, params as string[]).cursor(2) // => Vai retornar de 50 em 50 no rows 50[]

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'URL Original' },
      { key: 'short_url', header: 'URL Short' },
      { key: 'access_number', header: 'Access number' },
      { key: 'created_at', header: 'Uploaded at' },
    ],
  })
  const uploadToStorageStream = new PassThrough()

  // Pipeline começa com um READABLE depois varios TRANSFORM, TRANSFORM
  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream // Isso seria nossa contentStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return succeed({ linksCsvUrl: url })
}
