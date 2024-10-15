import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { RecipeProvider } from '@/lib/recipe-context';
import Header from '@/components/organisms/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Recipe App',
  description: 'A recipe sharing platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          <RecipeProvider>
            <Header />
            <main>{children}</main>
          </RecipeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
