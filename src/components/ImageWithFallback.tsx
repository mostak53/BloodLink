import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackInitials?: string;
  bloodType?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackInitials = 'BL',
  bloodType,
  className = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center ${className}`}>
      {/* Shimmer skeleton while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-pulse" />
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-rose-600 to-red-800 text-white font-bold select-none p-1 text-center">
          <span className="text-sm sm:text-base leading-tight font-extrabold">{bloodType || fallbackInitials}</span>
          <span className="text-[10px] opacity-80 uppercase tracking-wider">Bloodlink</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};
