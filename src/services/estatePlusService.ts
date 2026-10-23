import { Property } from '../types';
import { parseEstatePlusXml } from './estatePlusParser';

export const DEFAULT_ESTATE_PLUS_XML_URL =
  'https://stolica.estateplus.net/storage/stolica_20466/portals/W7xRAUZaPFlYUBbf-cms.xml';

// Default sync interval: 15 minutes in milliseconds
export const DEFAULT_SYNC_INTERVAL_MS = 15 * 60 * 1000;

export interface SyncResult {
  success: boolean;
  properties: Property[];
  allProperties?: Property[];
  activeCount: number;
  reservedCount: number;
  soldCount: number;
  totalCount: number;
  lastSyncTime: number;
  feedUpdatedTime: string;
  agencyName: string;
  isStale?: boolean;
  error?: string;
}

let inMemoryCache: SyncResult | null = null;
let lastFetchPromise: Promise<SyncResult> | null = null;

/**
 * Server-side function to get synchronized Estate Plus properties with caching.
 * Used by Vite middleware in dev and Vercel serverless function in production.
 */
export async function getSynchronizedProperties(options?: {
  xmlUrl?: string;
  intervalMs?: number;
  forceRefresh?: boolean;
}): Promise<SyncResult> {
  const xmlUrl = options?.xmlUrl || process.env.ESTATE_PLUS_XML_URL || DEFAULT_ESTATE_PLUS_XML_URL;
  const intervalMs =
    options?.intervalMs ||
    (process.env.ESTATE_PLUS_SYNC_INTERVAL_MINUTES
      ? Number(process.env.ESTATE_PLUS_SYNC_INTERVAL_MINUTES) * 60 * 1000
      : DEFAULT_SYNC_INTERVAL_MS);
  const forceRefresh = Boolean(options?.forceRefresh);

  const now = Date.now();

  // Return cache if valid and not force refresh
  if (!forceRefresh && inMemoryCache && now - inMemoryCache.lastSyncTime < intervalMs) {
    return inMemoryCache;
  }

  // Prevent duplicate simultaneous fetches
  if (lastFetchPromise && !forceRefresh) {
    return lastFetchPromise;
  }

  lastFetchPromise = (async () => {
    try {
      console.log(`[Estate Plus Sync] Fetching feed from: ${xmlUrl.slice(0, 45)}... (Force: ${forceRefresh})`);
      const response = await fetch(xmlUrl, {
        headers: {
          'User-Agent': 'StolicaInvest-CMS-Sync/1.0',
          Accept: 'text/xml, application/xml',
        },
        // Timeout signal
        signal: AbortSignal.timeout(25000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const xmlText = await response.text();
      const parseResult = parseEstatePlusXml(xmlText);

      console.log(
        `[Estate Plus Sync] Successfully parsed ${parseResult.activeCount} active properties (Total: ${parseResult.allProperties.length}, Feed updated: ${parseResult.updatedTimestamp})`
      );

      const result: SyncResult = {
        success: true,
        properties: parseResult.properties,
        allProperties: parseResult.allProperties,
        activeCount: parseResult.activeCount,
        reservedCount: parseResult.reservedCount,
        soldCount: parseResult.soldCount,
        totalCount: parseResult.allProperties.length,
        lastSyncTime: Date.now(),
        feedUpdatedTime: parseResult.updatedTimestamp,
        agencyName: parseResult.agencyName,
      };

      inMemoryCache = result;
      return result;
    } catch (err: any) {
      console.error('[Estate Plus Sync Error]', err?.message || err);

      // If we have existing cache, serve it marked as stale
      if (inMemoryCache) {
        return {
          ...inMemoryCache,
          isStale: true,
          error: `Грешка при обновяване от Estate Plus: ${err?.message || 'Недостъпен сървър'}`,
        };
      }

      // If no memory cache, return empty with error
      return {
        success: false,
        properties: [],
        activeCount: 0,
        reservedCount: 0,
        soldCount: 0,
        totalCount: 0,
        lastSyncTime: 0,
        feedUpdatedTime: '',
        agencyName: 'Столица Инвест',
        error: `Неуспешно извличане на XML: ${err?.message || 'Грешка в мрежата'}`,
      };
    } finally {
      lastFetchPromise = null;
    }
  })();

  return lastFetchPromise;
}

/**
 * Client-side function to retrieve properties.
 * Attempts to call /api/properties first.
 * If /api/properties is unavailable (e.g. pure static host or network error),
 * gracefully falls back to /data/estateplus-snapshot.json.
 */
export async function fetchPropertiesFromApi(forceRefresh = false): Promise<SyncResult> {
  const apiUrl = forceRefresh ? '/api/properties?force=true' : '/api/properties';

  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.properties) && data.properties.length > 0) {
        return {
          success: true,
          properties: data.properties,
          activeCount: data.activeCount || data.properties.length,
          reservedCount: data.reservedCount || 0,
          soldCount: data.soldCount || 0,
          totalCount: data.totalCount || data.properties.length,
          lastSyncTime: data.lastSyncTime || Date.now(),
          feedUpdatedTime: data.feedUpdatedTime || '',
          agencyName: data.agencyName || 'Столица Инвест',
          isStale: data.isStale,
          error: data.error,
        };
      }
    }
  } catch (err) {
    console.warn('[Estate Plus Client] /api/properties unavailable, trying snapshot fallback...', err);
  }

  // Fallback to static snapshot
  try {
    const snapshotRes = await fetch('/data/estateplus-snapshot.json');
    if (snapshotRes.ok) {
      const snapData = await snapshotRes.json();
      if (snapData && Array.isArray(snapData.properties) && snapData.properties.length > 0) {
        return {
          success: true,
          properties: snapData.properties,
          activeCount: snapData.activeCount || snapData.properties.length,
          reservedCount: snapData.reservedCount || 0,
          soldCount: snapData.soldCount || 0,
          totalCount: snapData.totalCount || snapData.properties.length,
          lastSyncTime: snapData.lastSyncTime || Date.now(),
          feedUpdatedTime: snapData.feedUpdatedTime || '',
          agencyName: snapData.agencyName || 'Столица Инвест',
          isStale: true,
        };
      }
    }
  } catch (snapErr) {
    console.error('[Estate Plus Client] Failed to load snapshot fallback:', snapErr);
  }

  throw new Error('Неуспешно зареждане на оферти от Estate Plus');
}
