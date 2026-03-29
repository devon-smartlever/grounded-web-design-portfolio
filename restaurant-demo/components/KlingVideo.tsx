"use client";

import { useState, useRef, useEffect } from "react";

interface KlingVideoProps {
  /** URL of the generated Kling AI video (WebM or MP4) */
  videoUrl?: string;
  /** Fallback image shown while loading or if no video is available */
  fallbackImageUrl?: string;
  /** Alt text for the fallback image */
  alt?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to loop the video */
  loop?: boolean;
  /** Whether to show controls */
  controls?: boolean;
  /** Callback when the video finishes loading */
  onLoad?: () => void;
}

/**
 * A lazy-loaded video component for Kling AI generated animations.
 * - Only loads the video when it enters the viewport (IntersectionObserver)
 * - Shows a fallback image while loading or if no video is available
 * - Autoplay, muted (required for autoplay in browsers)
 * - Supports WebM with MP4 fallback for broad browser support
 */
export default function KlingVideo({
  videoUrl,
  fallbackImageUrl,
  alt = "AI-generated animation",
  className = "",
  loop = true,
  controls = false,
  onLoad,
}: KlingVideoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load: only load video when it enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoUrl]);

  const showVideo = videoUrl && isVisible && !hasError;
  const showFallback = !showVideo || !isLoaded;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Fallback image */}
      {showFallback && fallbackImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackImageUrl}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-0 absolute inset-0" : "opacity-100"
          }`}
        />
      )}

      {/* Placeholder when no fallback image */}
      {showFallback && !fallbackImageUrl && (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
      )}

      {/* Lazy-loaded video */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop={loop}
          playsInline
          controls={controls}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          onError={() => setHasError(true)}
        >
          {/* Prefer WebM for smaller file sizes, fall back to MP4 */}
          {videoUrl.endsWith(".webm") ? (
            <>
              <source src={videoUrl} type="video/webm" />
              <source
                src={videoUrl.replace(".webm", ".mp4")}
                type="video/mp4"
              />
            </>
          ) : (
            <>
              <source src={videoUrl} type="video/mp4" />
              <source
                src={videoUrl.replace(".mp4", ".webm")}
                type="video/webm"
              />
            </>
          )}
          {/* Fallback for browsers that don't support video */}
          {fallbackImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fallbackImageUrl} alt={alt} />
          )}
        </video>
      )}
    </div>
  );
}
