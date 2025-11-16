/**
 * Simple in-memory rate limiter for Vercel serverless functions
 * Note: Memory may reset between cold starts. Good enough for basic protection.
 */

/** @type {Record<string, { count: number; resetTime: number }>} */
const store = {};

let dailyEmailCount = 0;
let dailyResetTime = Date.now() + 24 * 60 * 60 * 1000; // 24h from now

const LIMITS = {
  PER_IP_PER_MINUTE: 2,
  PER_IP_PER_HOUR: 10,
  PER_IP_PER_DAY: 20,
  DAILY_EMAIL_LIMIT: 400,
};

export function checkRateLimit(identifier, limitType) {
  const now = Date.now();

  if (now > dailyResetTime) {
    dailyEmailCount = 0;
    dailyResetTime = now + 24 * 60 * 60 * 1000;
  }

  if (dailyEmailCount >= LIMITS.DAILY_EMAIL_LIMIT) {
    return { allowed: false, remaining: 0, resetTime: dailyResetTime, error: "Günlük e-posta limiti aşıldı. Lütfen yarın tekrar deneyin." };
  }

  let duration;
  let maxRequests;
  switch (limitType) {
    case "minute":
      duration = 60 * 1000;
      maxRequests = LIMITS.PER_IP_PER_MINUTE;
      break;
    case "hour":
      duration = 60 * 60 * 1000;
      maxRequests = LIMITS.PER_IP_PER_HOUR;
      break;
    case "day":
      duration = 24 * 60 * 60 * 1000;
      maxRequests = LIMITS.PER_IP_PER_DAY;
      break;
    default:
      duration = 60 * 1000;
      maxRequests = LIMITS.PER_IP_PER_MINUTE;
  }

  const key = `${identifier}_${limitType}`;
  const record = store[key];

  if (!record || now > record.resetTime) {
    store[key] = { count: 1, resetTime: now + duration };
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + duration };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      error: `Çok fazla istek gönderdiniz. ${Math.ceil((record.resetTime - now) / 1000)} saniye sonra tekrar deneyin.`,
    };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

export function incrementDailyEmailCount() {
  dailyEmailCount++;
}

export function getDailyEmailCount() {
  return {
    current: dailyEmailCount,
    limit: LIMITS.DAILY_EMAIL_LIMIT,
    remaining: Math.max(0, LIMITS.DAILY_EMAIL_LIMIT - dailyEmailCount),
    resetTime: dailyResetTime,
  };
}

export function getClientIP(req) {
  // Common reverse proxy headers (Vercel, Cloudflare, etc.)
  const cf = req.headers['cf-connecting-ip'];
  if (cf) return Array.isArray(cf) ? cf[0] : cf;

  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const v = Array.isArray(xff) ? xff[0] : xff;
    return v.split(',')[0].trim();
  }

  const xri = req.headers['x-real-ip'];
  if (xri) return Array.isArray(xri) ? xri[0] : xri;

  const remote = req.socket?.remoteAddress || 'unknown';
  return remote;
}

export function clearRateLimits() {
  Object.keys(store).forEach((k) => delete store[k]);
  dailyEmailCount = 0;
}