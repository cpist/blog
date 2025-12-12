import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Blog",
  description: "Next.js + MDX blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <h1 style={{ margin: "8px 0" }}>
              <Link href="/" style={{ textDecoration: "none" }}>My Blog</Link>
            </h1>
            <nav style={{ display: "flex", gap: 12 }}>
              <Link href="/posts">Posts</Link>
            </nav>
          </header>
          <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "12px 0 24px" }} />
          {children}
          <footer style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #eee", color: "#666" }}>
            © {new Date().getFullYear()} My Blog
          </footer>
        </main>
      </body>
    </html>
  );
}
