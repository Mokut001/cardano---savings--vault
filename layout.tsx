
import { MeshProvider } from '@meshsdk/react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MeshProvider>
          {children}
        </MeshProvider>
      </body>
    </html>
  );
}