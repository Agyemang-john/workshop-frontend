import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeRegistry from '@/components/common/ThemeRegistery';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Container from '@mui/material/Container';



export const metadata: Metadata = {
  title: 'Workshop App',
  description: 'Register for workshops and get reminders!',
  manifest: "/manifest.json",
  themeColor: "#0d9488",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
            {children}
          </Container>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
