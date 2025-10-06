export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>App Filmes Next.js</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}