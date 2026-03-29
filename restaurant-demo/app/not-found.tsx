export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1209] text-[#f5f0e8]">
      <div className="text-center">
        <h1 className="font-serif-display text-8xl text-[#c9a84c] mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <a href="/" className="px-8 py-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a1209] transition-all">
          Return Home
        </a>
      </div>
    </div>
  )
}
