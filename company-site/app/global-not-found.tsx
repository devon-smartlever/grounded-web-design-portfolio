import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Grounded Web Design",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#07070f",
          color: "#f0f0fa",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "6rem",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1rem",
              background: "linear-gradient(135deg,#818cf8,#a78bfa,#e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </p>
          <h1 style={{ marginBottom: "0.75rem", fontSize: "1.5rem" }}>
            Page not found
          </h1>
          <p style={{ color: "rgba(240,240,250,0.5)", marginBottom: "2rem" }}>
            The page you are looking for does not exist.
          </p>
          <a
            href="/"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              background: "linear-gradient(135deg,#6366f1,#a855f7)",
            }}
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
