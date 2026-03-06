/**
 * Safely parse an ID parameter to a positive integer.
 * Returns null if the value is not a valid positive integer.
 * @param {string|number} value
 * @returns {number|null}
 */
function parseId(value) {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
}

/**
 * Express middleware that validates :id param is a positive integer.
 */
function validateIdParam(req, res, next) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  req.params.id = String(id); // normalise
  next();
}

module.exports = { parseId, validateIdParam };
