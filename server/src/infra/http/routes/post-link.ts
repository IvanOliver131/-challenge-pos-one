import { postLink } from '@/app/functions/post-link'
import { isSuccess, unwrapResult } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const postLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Post a link',
        tags: ['links'],
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string(),
        }),
        response: {
          201: z.object({ message: z.string() }).describe('Link added'),
          400: z.object({ message: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Link already exists.'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      if (!originalUrl || !shortUrl)
        return reply.status(400).send({ message: 'Link is required' })

      const result = await postLink({
        originalUrl: originalUrl,
        shortUrl: shortUrl,
      })

      if (isSuccess(result)) {
        const { message } = unwrapResult(result)

        return reply.status(201).send({ message })
      }

      return reply.status(400).send({ message: 'Error' })
    }
  )
}
