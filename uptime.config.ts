import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Gabe's Media Server Status",
  links: [
    { link: 'https://gabebryk.com', label: 'Website' },
    { link: 'https://plex.gabebryk.com/web/index.html', label: 'Open Plex', highlight: true },
  ],
  group: {
    'Media Services': ['plex'],
  },
  logo: '/logo.svg',
  favicon: '/favicon.svg',
  customFooter:
    '<p style="text-align:center;font-size:12px;margin:24px 0;opacity:.65">Cloudflare-powered status monitoring for Gabe\'s media server.</p>',
}

const workerConfig: WorkerConfig = {
  // Persist every probe so the status page always shows the real check time.
  kvWriteCooldownMinutes: 1,
  monitors: [
    {
      id: 'plex',
      name: 'Plex Media Server',
      method: 'GET',
      target: 'https://plex.gabebryk.com/web/index.html',
      tooltip: 'Plex web app and media server front door',
      statusPageLink: 'https://plex.gabebryk.com/web/index.html',
      expectedCodes: [200],
      responseKeyword: '<title>Plex',
      timeout: 15000,
      checkProxy: 'worker://enam',
      checkProxyFallback: true,
    },
  ],
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
