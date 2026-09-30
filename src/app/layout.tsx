import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HARI E-TECHNO SCHOOL — Rajanagaram, Andhra Pradesh | Admissions Open 2026–27',
  description: 'HARI E-TECHNO SCHOOL is a premium digital school in Rajanagaram, Andhra Pradesh. CBSE-inspired pedagogy, 100% digital learning, expert faculty, and holistic value-based education.',
  keywords: ['Hari E-Techno School', 'Rajanagaram school', 'Andhra Pradesh schools', 'digital school', 'CBSE pedagogy', 'smart classrooms Rajanagaram', 'Grand Exam 2026'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon.png' }],
  },
  openGraph: {
    title: 'HARI E-TECHNO SCHOOL — Shaping Future-Ready Global Learners',
    description: 'A premium digital school nurturing excellence, discipline and values in Rajanagaram, Andhra Pradesh.',
    url: 'https://harietechnoschool.com',
    siteName: 'HARI E-TECHNO SCHOOL',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
