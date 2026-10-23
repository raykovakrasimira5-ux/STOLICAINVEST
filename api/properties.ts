import { getSynchronizedProperties } from '../src/services/estatePlusService';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const forceRefresh =
      req.query?.force === 'true' ||
      req.query?.sync === 'true' ||
      req.url?.includes('force=true') ||
      req.url?.includes('sync=true');

    const result = await getSynchronizedProperties({ forceRefresh });

    // HTTP Cache Headers: cache for 15 minutes, allow stale while revalidating
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    res.status(200).json(result);
  } catch (err: any) {
    console.error('[API /api/properties error]', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Internal server error during Estate Plus synchronization',
    });
  }
}
