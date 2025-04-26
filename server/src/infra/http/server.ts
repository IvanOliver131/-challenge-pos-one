import { fastify } from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  hasZodFastifySchemaValidationErrors,
} from 'fastify-type-provider-zod'

import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'

import { postLinkRoute } from './routes/post-link'
import { exportLinksRoute } from './routes/export-links'
import { getLinksRoute } from './routes/get-links'
import { deleteLinkRoute } from './routes/delete-link'
import fastifySwagger from '@fastify/swagger'
import fastifyMultipart from '@fastify/multipart'
import { transformSwaggerSchema } from './routes/transform-swagger-schema'
import { getOriginalLinkByShortLinkRoute } from './routes/get-original-link-by-short-link'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  // Enviar o erro p/ alguma ferramenta de observabilidade (Senty/Datadog/Grafana/OTel)
  console.error(error)

  return reply.status(500).send({ message: 'Internal server errror.' })
})

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// ROTAS
server.register(postLinkRoute)
server.register(deleteLinkRoute)
server.register(getLinksRoute)
server.register(getOriginalLinkByShortLinkRoute)
server.register(exportLinksRoute)

const serverConfig = { port: 3333, host: '0.0.0.0' }

server.listen(serverConfig).then(() => {
  console.log('HTTP server running!')
})
