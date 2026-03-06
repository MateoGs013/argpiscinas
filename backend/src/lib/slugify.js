const slugify = require('slugify');

/**
 * Generate a URL-safe slug from a string.
 * @param {string} text
 * @returns {string}
 */
function generateSlug(text) {
  return slugify(text, { lower: true, strict: true });
}

/**
 * Ensure slug is unique for a given Prisma model.
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {string} modelName - e.g. 'post', 'project', 'tag', 'category'
 * @param {string} slug
 * @param {number|null} excludeId - ID to exclude (for updates)
 * @returns {Promise<string>} unique slug
 */
async function ensureUniqueSlug(prisma, modelName, slug, excludeId = null) {
  const where = { slug };
  if (excludeId) {
    where.id = { not: excludeId };
  }

  const existing = await prisma[modelName].findFirst({ where });
  if (existing) {
    return `${slug}-${Date.now()}`;
  }
  return slug;
}

module.exports = { generateSlug, ensureUniqueSlug };
