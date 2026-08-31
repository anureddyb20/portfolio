import './globals.css';

export const metadata = {
  title: 'Anu Reddy B — Portfolio',
  description: 'Electronics & Communication Engineering Student building practical digital experiences through technology, software and creative problem solving.',
  authors: [{ name: 'Anu Reddy B' }],
  keywords: ['Anu Reddy B', 'Electronics & Communication Engineering', 'Portfolio', 'Developer', 'Creative Engineering'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5f5f5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Bebas+Neue&family=Oswald:wght@700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
