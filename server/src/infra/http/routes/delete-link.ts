import { deleteLink } from '@/app/functions/delete-link'
import { isSuccess, unwrapResult } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Deleting a link',
        tags: ['links'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          201: z.object({ message: z.string() }).describe('Link deleted'),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      if (!id)
        return reply.status(400).send({ message: 'Short link is required' })

      const result = await deleteLink({
        id,
      })

      if (isSuccess(result)) {
        const { message } = unwrapResult(result)

        return reply.status(201).send({ message })
      }

      return reply.status(400).send({ message: 'Error' })
    }
  )
}
