import { getOriginalLinkByShortLink } from '@/app/functions/get-original-link-by-short-link'
import { isSuccess, unwrapResult } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalLinkByShortLinkRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/links/:shortUrl',
      {
        schema: {
          summary: 'Get a link',
          tags: ['links'],
          params: z.object({
            shortUrl: z.string(),
          }),
          response: {
            201: z.object({ originalUrl: z.string().url() }),
            400: z.object({ message: z.string() }),
          },
        },
      },
      async (request, reply) => {
        const { shortUrl } = request.params

        if (!shortUrl)
          return reply.status(400).send({ message: 'Short link is required' })

        const result = await getOriginalLinkByShortLink({
          shortUrl,
        })

        if (isSuccess(result)) {
          const { originalUrl } = unwrapResult(result)

          return reply.status(201).send({ originalUrl })
        }

        const error = unwrapResult(result)

        return reply.status(400).send({ message: 'Error' })
      }
    )
  }
