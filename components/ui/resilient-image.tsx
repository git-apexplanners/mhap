"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ResilientImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  ...props
}: ResilientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        console.warn(`Image failed to load: ${src}, using fallback`);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
