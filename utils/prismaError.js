// utils/mapPrismaError.js
const mapPrismaError = (error) => {
  const mappings = {
    P2002: { status: 409, message: 'Unique constraint failed' },
    P2025: { status: 404, message: 'Record not found' },
    P2003: { status: 409, message: 'Foreign key constraint failed' },
    P2000: { status: 400, message: 'Value too long for field' },
    P2005: { status: 400, message: 'Invalid field value' },
    P2006: { status: 400, message: 'Missing required field' },
    P2007: { status: 400, message: 'Invalid JSON input' },
    P2009: { status: 400, message: 'Invalid query format' },
    P2011: { status: 400, message: 'Null constraint violation' },
    P2012: { status: 400, message: 'Missing required argument' },
    P2013: { status: 400, message: 'Missing relational argument' },
    P2014: { status: 400, message: 'Relation constraint violation' },
    P2015: { status: 404, message: 'Related record not found' },
    P2021: { status: 500, message: 'Table does not exist' },
    P2022: { status: 500, message: 'Column does not exist' },
  }

  return mappings[error.code] || { status: 500, message: 'Unhandled database error' }
}

module.exports = mapPrismaError
