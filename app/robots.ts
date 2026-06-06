import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'http://ebizaorthopaedic.in'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/diag', '/diag/'],
      },
      {
        // Explicitly allow AI LLM crawlers/bots
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Anthropic-AI',
          'cohere-ai',
          'PerplexityBot',
          'Meta-ExternalAgent',
          'Applebot-Extended'
        ],
        allow: '/',
        disallow: ['/diag', '/diag/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
