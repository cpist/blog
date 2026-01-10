import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "CPIST's blog",
  description: "Next.js + MDX blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0KOVEMVIqhKyMVPsoloXttrTHYUjDkaWaXIhKbMCh2GbqNl2CAPFu"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <main>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <h1 style={{ margin: "8px 0" }}>
              <Link href="/" style={{ textDecoration: "none" }}>CPIST's blog</Link>
            </h1>
            <nav style={{ display: "flex", gap: 12 }}>
              <Link href="/posts">Posts</Link>
            </nav>
          </header>
          <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "12px 0 24px" }} />
          {children}
          <footer style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #eee", color: "#666" }}>
            © {new Date().getFullYear()} CPIST's blog
          </footer>
        </main>
      </body>
    </html>
  );
}
