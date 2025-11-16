import { getDailyEmailCount } from './_lib/rate-limiter.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const stats = getDailyEmailCount();
  const percentage = Math.round((stats.current / stats.limit) * 100);
  const resetDate = new Date(stats.resetTime).toLocaleString('tr-TR');
  const hoursUntilReset = Math.ceil((stats.resetTime - Date.now()) / (1000 * 60 * 60));

  let message = '✅ Sistem normal çalışıyor';
  if (stats.remaining === 0) message = '🚫 Günlük limit doldu!';
  else if (stats.remaining < 50) message = '⚠️ Limit dolmak üzere!';

  res.status(200).json({
    success: true,
    stats: {
      current: stats.current,
      limit: stats.limit,
      remaining: stats.remaining,
      percentage,
      resetTime: resetDate,
      resetIn: hoursUntilReset,
    },
    message,
  });
}