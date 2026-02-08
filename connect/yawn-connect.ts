/**
 * YawnConnect — Lightweight connector for independently hosted YawnJobs
 *
 * Zero dependencies. Works in Node.js, Deno, Bun, and modern browsers (server-side only).
 * Enables any hosted yawnjob to securely connect back to the yawn.ai network.
 *
 * Security model:
 *   - API key (yawn_sk_...) authenticated via SHA-256 hash on yawn.ai
 *   - All requests over HTTPS
 *   - Scoped access: only connected yawns are readable
 *   - Rate limited per key
 *
 * Usage:
 *   const yawn = new YawnConnect({
 *     apiKey: process.env.YAWN_API_KEY!,
 *     yawnSlug: 'trademark-bitch',
 *   })
 *
 *   await yawn.handshake('trademark', 'child')
 *   const links = await yawn.getLinks()
 *   await yawn.submitEvidence({ type: 'link', content: 'https://...' })
 */

// =============================================================================
// Types
// =============================================================================

export interface YawnConnectConfig {
  /** API key in format yawn_sk_... (server-side only, never expose to client) */
  apiKey: string
  /** Base URL of the yawn.ai instance (defaults to https://yawn.ai) */
  baseUrl?: string
  /** This yawn's slug (e.g. 'trademark-bitch') */
  yawnSlug: string
  /** Request timeout in ms (default 30000) */
  timeoutMs?: number
}

export interface HandshakeResult {
  success: boolean
  handshake: {
    id: string
    source: { slug: string; title: string }
    target: { slug: string; title: string }
    link_type: string
    inverse_link_type: string
    bidirectional: boolean
    auth_method: string
    established_at: string
  }
  api: {
    links_endpoint: string
    target_links_endpoint: string
  }
}

export interface YawnLink {
  id: string
  source_yawn_id: string
  target_yawn_id: string
  link_type: string
  created_at: string
  source?: { slug: string; title: string }
  target?: { slug: string; title: string }
}

export interface YawnLinksResponse {
  outgoing: YawnLink[]
  incoming: YawnLink[]
  total: number
}

export interface Evidence {
  /** Evidence type: artifact, test_log, screenshot, link, self_attest */
  type: 'artifact' | 'test_log' | 'screenshot' | 'link' | 'self_attest'
  /** Description or content of the evidence */
  content: string
  /** URL to external proof (optional) */
  proof_url?: string
}

export interface EvidenceResult {
  id: string
  yawn_id: string
  evidence_type: string
  created_at: string
}

export interface YawnExport {
  yawn_id: string
  slug: string
  title: string
  description: string
  parsed_json: Record<string, unknown>
  coherence_score: number
  status: string
}

export interface PingResult {
  status: 'ok' | 'error'
  network: string
  timestamp: string
  version: string
}

export interface YawnConnectError {
  status: number
  code: string
  message: string
}

// =============================================================================
// YawnConnect Client
// =============================================================================

export class YawnConnect {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly yawnSlug: string
  private readonly timeoutMs: number

  constructor(config: YawnConnectConfig) {
    if (!config.apiKey || !config.apiKey.startsWith('yawn_sk_')) {
      throw new Error('YawnConnect: apiKey must start with "yawn_sk_"')
    }
    if (!config.yawnSlug) {
      throw new Error('YawnConnect: yawnSlug is required')
    }

    this.apiKey = config.apiKey
    this.baseUrl = (config.baseUrl || 'https://yawn.ai').replace(/\/$/, '')
    this.yawnSlug = config.yawnSlug
    this.timeoutMs = config.timeoutMs || 30_000
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Establish a link to another yawn in the network.
   * Creates bidirectional links (forward + inverse) automatically.
   *
   * @param targetSlug - The slug of the yawn to connect to
   * @param linkType - Relationship type: 'child', 'parent', 'reference', 'related', 'inherits_from'
   */
  async handshake(
    targetSlug: string,
    linkType: 'child' | 'parent' | 'reference' | 'related' | 'inherits_from' = 'reference'
  ): Promise<HandshakeResult> {
    return this.post<HandshakeResult>('/api/enterprise/handshake', {
      source_slug: this.yawnSlug,
      target_slug: targetSlug,
      link_type: linkType,
    })
  }

  /**
   * Query all links (incoming and outgoing) for this yawn.
   */
  async getLinks(): Promise<YawnLinksResponse> {
    return this.get<YawnLinksResponse>(`/api/yawn/link?slug=${encodeURIComponent(this.yawnSlug)}`)
  }

  /**
   * Submit evidence of work completion.
   * Requires the yawn_id, which can be resolved via getLinks() or handshake().
   *
   * @param yawnId - The UUID of the yawn to submit evidence for
   * @param evidence - Evidence data (type, content, optional proof_url)
   */
  async submitEvidence(yawnId: string, evidence: Evidence): Promise<EvidenceResult> {
    return this.post<EvidenceResult>(`/api/yawn/${yawnId}/evidence`, {
      evidence_type: evidence.type,
      content: evidence.content,
      proof_url: evidence.proof_url,
    })
  }

  /**
   * Export/read data from a connected yawn.
   * Only works for yawns this holon has an active link to.
   *
   * @param yawnId - The UUID of the yawn to read
   */
  async readYawn(yawnId: string): Promise<YawnExport> {
    return this.get<YawnExport>(`/api/yawn/${yawnId}/export`)
  }

  /**
   * Health check — verify connectivity to the yawn network.
   */
  async ping(): Promise<PingResult> {
    try {
      const result = await this.get<Record<string, unknown>>('/api/yawn/protocol')
      return {
        status: 'ok',
        network: 'yawn.ai',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      }
    } catch {
      return {
        status: 'error',
        network: 'yawn.ai',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      }
    }
  }

  /**
   * Get the slug this connector is configured for.
   */
  get slug(): string {
    return this.yawnSlug
  }

  // ---------------------------------------------------------------------------
  // Internal HTTP helpers (zero-dependency)
  // ---------------------------------------------------------------------------

  private async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path)
  }

  private async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    return this.request<T>('POST', path, body)
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`

    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': `YawnConnect/1.0.0 (${this.yawnSlug})`,
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        let parsed: { error?: string; message?: string } = {}
        try {
          parsed = JSON.parse(errorBody)
        } catch {
          // Not JSON — use raw text
        }

        const error: YawnConnectError = {
          status: response.status,
          code: `HTTP_${response.status}`,
          message: parsed.error || parsed.message || errorBody || response.statusText,
        }
        throw error
      }

      return (await response.json()) as T
    } finally {
      clearTimeout(timeout)
    }
  }
}
