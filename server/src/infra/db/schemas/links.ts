import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('uploads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  accessNumber: integer('access_number').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
