const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: "id used is malformed" }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),

  TokenExpirerError: (res) => res.status(401).json({ error: "token expired" }),

  NotFoundError: (res) => res.status(404).json({ error: "resource not found" }),

  defaultError: (res, error) => {
    console.error(error.name)
    res.status(500).end()
  },
}

export const handleErrors = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(res, error)
}
