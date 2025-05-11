const { Prisma } = require('@prisma/client')
const mapPrismaError = require('./prismaError')

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { status, message } = mapPrismaError(error)
    return response.status(status).json({ error: message, code: error.code })
  }

  return response.status(500).json({ error: 'Internal server error' })
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}