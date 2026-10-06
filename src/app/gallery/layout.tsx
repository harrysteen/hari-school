import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery — HARI E-TECHNO SCHOOL, Rajanagaram',
  description: 'Photos of celebrations, events and everyday school life at HARI E-TECHNO SCHOOL and HARI JUNIOR COLLEGE, Rajanagaram, Andhra Pradesh.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
