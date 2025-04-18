import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { NavigationProvider } from '@/lib/navigation-context';
import { DataProvider } from '@/lib/data-context';

export const metadata: Metadata = {
  title: 'Michael Hart Architects',
  description: '33+ years of architectural excellence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            <NavigationProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </div>
            </NavigationProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}