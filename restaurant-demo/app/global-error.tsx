'use client'

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a1209', color: '#f5f0e8', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '24px' }}>Something went wrong</h2>
          <button onClick={() => unstable_retry()} style={{ padding: '10px 24px', background: '#c9a84c', color: '#1a1209', border: 'none', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
