'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';
import type { MagnifyAnythingProps } from 'magnify-anything';
import Footer from '../footer';
import Navbar from '../navbar';
import { useMagnify } from './magnify-provider';

const Magnifier = dynamic<MagnifyAnythingProps>(
  () =>
    import('magnify-anything').then(
      (module) => module.default as ComponentType<MagnifyAnythingProps>,
    ),
  { ssr: false },
);

export default function MagnifyShell({ children }: { children: ReactNode }) {
  const { isMagnifyEnabled } = useMagnify();

  const pageContent = (
    <div className={isMagnifyEnabled ? 'magnify-active flex-1' : 'flex-1'}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );

  if (!isMagnifyEnabled) {
    return pageContent;
  }

  return (
    <Magnifier previewSize={180} zoom={2} borderColor="var(--color-accent)">
      {pageContent}
    </Magnifier>
  );
}
