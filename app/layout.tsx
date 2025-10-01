// app/layout.tsx - Root layout for Next.js app router
import "./globals.css";

export const metadata = {
  title: "Honey Marketplace",
  description: "Buy and sell honey and byproducts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white antialiased pt-24">
        {children}
      </body>
    </html>
  );
}
