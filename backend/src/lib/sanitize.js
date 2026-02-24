/**
 * Lightweight HTML sanitiser for rich-text content stored in the DB.
 * Allows only safe tags used by the CMS rich-text editor.
 */

let sanitizeHtml;
try {
  sanitizeHtml = require('sanitize-html');
} catch {
  // Fallback: strip ALL tags if sanitize-html is not installed
  sanitizeHtml = (dirty) => dirty.replace(/<[^>]*>/g, '');
}

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'strong', 'b', 'em', 'i', 'u', 's', 'del',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'figure', 'figcaption',
  'div', 'span',
];

const ALLOWED_ATTRS = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height', 'loading'],
  th: ['colspan', 'rowspan'],
  td: ['colspan', 'rowspan'],
  '*': ['class'],
};

/**
 * Sanitise HTML content, stripping dangerous tags/attributes.
 * @param {string} dirty
 * @returns {string}
 */
function sanitize(dirty) {
  if (!dirty || typeof dirty !== 'string') return dirty;
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ['http', 'https', 'mailto'],
    // Force safe links
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}

module.exports = { sanitize };
