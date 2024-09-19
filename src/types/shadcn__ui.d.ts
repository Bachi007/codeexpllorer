// shadcn__ui.d.ts
declare module '@shadcn/ui' {
    import { FC, ReactNode } from 'react';
  
    export const Container: FC<{ children: ReactNode, className?: string }>;
    export const Heading: FC<{ level: number, className?: string, children: ReactNode }>;
    export const Text: FC<{ children: ReactNode, className?: string }>;
    export const Box: FC<{ children: ReactNode, className?: string }>;
    export const Image: FC<{ src: string, alt: string, className?: string }>;
    export const List: FC<{ children: ReactNode, className?: string }>;
    export const ListItem: FC<{ children: ReactNode, className?: string }>;
    export const Button: FC<{ children: ReactNode, className?: string }>;
    export const Stack: FC<{ children: ReactNode, className?: string }>;
    export const Separator: FC<{ className?: string }>;
  }
  