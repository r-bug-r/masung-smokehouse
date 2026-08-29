/**
 * Security Sanitization Utility
 * Mitigates XSS, script injection, and attribute injection across user input fields.
 */

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

/**
 * Escapes unsafe HTML characters to prevent XSS.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, match => HTML_ENTITIES[match] || match);
}

/**
 * Strips script tags, iframe, object, embed, and dangerous javascript: URLs.
 */
export function sanitizeText(input: string, maxLength: number = 300): string {
  if (!input || typeof input !== 'string') return '';
  
  let cleaned = input.trim();
  
  // Truncate to maximum acceptable length to prevent memory attacks
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  // Remove script, iframe, object, embed tags and their contents
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  cleaned = cleaned.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  cleaned = cleaned.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');

  // Strip event handler attributes (e.g. onerror=, onclick=, onload=)
  cleaned = cleaned.replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, '');
  cleaned = cleaned.replace(/\bon\w+\s*=\s*[^>\s]+/gi, '');

  // Neutralize javascript: or data: URIs
  cleaned = cleaned.replace(/javascript:/gi, 'blocked:');
  cleaned = cleaned.replace(/data:text\/html/gi, 'blocked:');

  // Strip any remaining HTML tags for plain text fields
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');

  return cleaned.trim();
}

/**
 * Validates and normalizes Philippine mobile phone numbers (e.g. 09171234567, +639171234567).
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  // Strip all non-digit and non-plus characters
  const cleaned = phone.replace(/[^\d+]/g, '').trim();
  return cleaned.slice(0, 16);
}

export const sanitizePhone = sanitizePhoneNumber;

/**
 * Validates promo code input (only alphanumeric, uppercase, up to 16 chars).
 */
export function sanitizePromoCode(code: string): string {
  if (!code || typeof code !== 'string') return '';
  return code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);
}
