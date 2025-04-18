import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Michael Hart Architects',
  description: 'Explore our complete portfolio of architectural and urban design projects',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
    </main>
  );
}
