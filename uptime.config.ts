import { MaintenanceConfig, MonitorTarget, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Gabe's Service Status",
  links: [
    { link: 'https://gabebryk.com', label: 'Website' },
    { link: 'https://plex.gabebryk.com/web/index.html', label: 'Open Plex', highlight: true },
  ],
  group: {
    'Public Sites & Apps': [
      'website',
      'website-www',
      'status',
      'plex',
      'busysync',
      'grocery',
      'share',
      'dify',
      'element',
      'langfuse',
      'langgraph-poc',
      'matrix',
      'newsblur',
      'postiz',
      'agent-chat',
      'affine',
    ],
    'Authenticated Services': [
      'agents',
      'coolify',
      'write',
      'freshrss',
      'frigate',
      'grafana',
      'hermes',
      'hindsight',
      'llm',
      'prompts',
      'speedwatch',
      'authentik',
      'leantime',
      'khoj',
      'lazylibrarian',
      'anythingllm',
      'calibre-web',
      'calibre',
      'openclaw',
      'request',
      'obsidian-livesync',
    ],
    'Public APIs & Infrastructure': [
      'hermes-api',
      'minio-console',
      'minio',
      'fileflows',
      'alloy',
      'logpush',
      'loki',
      'mimir',
      'tempo',
    ],
  },
  logo: '/logo.svg',
  favicon: '/favicon.svg',
  customFooter:
    '<p style="text-align:center;font-size:12px;margin:24px 0;opacity:.65">Cloudflare-powered monitoring of Gabe\'s internet-facing services.</p>',
}

const normalWebCodes = [200, 301, 302, 303, 307, 308, 401, 403, 404]

function externalMonitor(
  id: string,
  name: string,
  target: string,
  expectedCodes: number[] = normalWebCodes,
  responseKeyword?: string
): MonitorTarget {
  return {
    id,
    name,
    method: 'GET',
    target,
    statusPageLink: target,
    expectedCodes,
    responseKeyword,
    timeout: 15000,
  }
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 1,
  monitors: [
    externalMonitor('website', 'gabebryk.com', 'https://gabebryk.com', [200]),
    externalMonitor('website-www', 'www.gabebryk.com', 'https://www.gabebryk.com', [200]),
    externalMonitor('status', 'Public Status Page', 'https://status.gabebryk.com', [200]),
    externalMonitor(
      'plex',
      'Plex Media Server',
      'https://plex.gabebryk.com/web/index.html',
      [200],
      '<title>Plex'
    ),
    externalMonitor('busysync', 'BusySync', 'https://busysync.gabebryk.com'),
    externalMonitor('grocery', 'Grocery Planner', 'https://grocery.gabebryk.com'),
    externalMonitor('share', 'Agent HTML Share', 'https://share.gabebryk.com'),
    externalMonitor('dify', 'Dify', 'https://dify.gabebryk.com'),
    externalMonitor('element', 'Element', 'https://element.gabebryk.com'),
    externalMonitor('langfuse', 'Langfuse', 'https://langfuse.gabebryk.com'),
    externalMonitor('langgraph-poc', 'LangGraph API', 'https://langgraph-poc.gabebryk.com'),
    externalMonitor('matrix', 'Matrix', 'https://matrix.gabebryk.com'),
    externalMonitor('newsblur', 'NewsBlur', 'https://newsblur.gabebryk.com'),
    externalMonitor('postiz', 'Postiz', 'https://postiz.gabebryk.com'),
    externalMonitor('agent-chat', 'Agent Chat', 'https://agent-chat.gabebryk.com'),
    externalMonitor('affine', 'AFFiNE', 'https://affine.gabebryk.com'),

    externalMonitor('agents', 'Agents', 'https://agents.gabebryk.com'),
    externalMonitor('coolify', 'Coolify', 'https://coolify.gabebryk.com'),
    externalMonitor('write', 'Fiction Writer', 'https://write.gabebryk.com'),
    externalMonitor('freshrss', 'FreshRSS', 'https://freshrss.gabebryk.com'),
    externalMonitor('frigate', 'Frigate', 'https://frigate.gabebryk.com'),
    externalMonitor('grafana', 'Grafana', 'https://grafana.gabebryk.com'),
    externalMonitor('hermes', 'Hermes', 'https://hermes.gabebryk.com'),
    externalMonitor('hindsight', 'Hindsight', 'https://hindsight.gabebryk.com'),
    externalMonitor('llm', 'LiteLLM', 'https://llm.gabebryk.com'),
    externalMonitor('prompts', 'Prompts', 'https://prompts.gabebryk.com'),
    externalMonitor('speedwatch', 'Speedwatch', 'https://speedwatch.gabebryk.com'),
    externalMonitor('authentik', 'Authentik', 'https://auth.gabebryk.com'),
    externalMonitor('leantime', 'Leantime', 'https://leantime.gabebryk.com'),
    externalMonitor('khoj', 'Khoj', 'https://khoj.gabebryk.com'),
    externalMonitor('lazylibrarian', 'LazyLibrarian', 'https://lazylibrarian.gabebryk.com'),
    externalMonitor('anythingllm', 'AnythingLLM', 'https://anythingllm.gabebryk.com'),
    externalMonitor('calibre-web', 'Calibre Web', 'https://calibre-web.gabebryk.com'),
    externalMonitor('calibre', 'Calibre', 'https://calibre.gabebryk.com'),
    externalMonitor('openclaw', 'OpenClaw', 'https://openclaw.gabebryk.com'),
    externalMonitor('request', 'Seerr Requests', 'https://request.gabebryk.com'),
    externalMonitor(
      'obsidian-livesync',
      'Obsidian LiveSync',
      'https://obsidian-livesync.gabebryk.com'
    ),

    externalMonitor('hermes-api', 'Hermes API', 'https://hermes-api.gabebryk.com'),
    externalMonitor('minio-console', 'Object Storage Console', 'https://minio-console.gabebryk.com'),
    externalMonitor('minio', 'Object Storage API', 'https://minio.gabebryk.com'),
    externalMonitor('fileflows', 'FileFlows', 'https://fileflows.gabebryk.com'),
    externalMonitor('alloy', 'Alloy Ingress', 'https://alloy.gabebryk.com'),
    externalMonitor('logpush', 'Logpush Ingress', 'https://logpush.gabebryk.com'),
    externalMonitor('loki', 'Loki Ingress', 'https://loki.gabebryk.com'),
    externalMonitor('mimir', 'Mimir Ingress', 'https://mimir.gabebryk.com'),
    externalMonitor('tempo', 'Tempo Ingress', 'https://tempo.gabebryk.com'),
  ],
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
