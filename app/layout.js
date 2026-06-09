import './globals.css';

export const metadata = {
  title: 'ZeeLy Realty — Find Your Perfect Property',
  description:
    'Buy, sell, or rent premium properties with ZeeLy Realty. Verified listings, expert agents, and an effortless experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body>{children}</body>
    </html>
  );
}
