import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "NextPosts",
  description: "Browse and share amazing posts.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
