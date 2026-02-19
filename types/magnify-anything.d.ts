declare module 'magnify-anything' {
  import type { ComponentType, ReactNode } from 'react';

  export type MagnifyAnythingProps = {
    children: ReactNode;
    previewSize?: number;
    zoom?: number;
    borderColor?: string;
  };

  const MagnifyAnything: ComponentType<MagnifyAnythingProps>;
  export default MagnifyAnything;
}
