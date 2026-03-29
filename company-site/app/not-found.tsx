import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center px-6">
        <p
          className="text-8xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg,#818cf8,#a78bfa,#e879f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="mb-8" style={{ color: "rgba(240,240,250,0.5)" }}>
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
