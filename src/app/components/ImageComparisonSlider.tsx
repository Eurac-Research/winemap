'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  aspectRatio?: string; // Optional: e.g., "16/9", "4/3", "auto"
  caption?: string; // Optional caption to display below the image
}

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Comparison',
  aspectRatio = 'auto',
  caption,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, useFullscreenRef?: boolean) => {
    const ref = useFullscreenRef && isFullscreen ? fullscreenContainerRef : containerRef;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent, useFullscreenRef?: boolean) => {
    if (!isDragging) return;
    handleMove(e.clientX, useFullscreenRef);
  };

  const handleClick = (e: React.MouseEvent, useFullscreenRef?: boolean) => {
    // Move slider to click position
    handleMove(e.clientX, useFullscreenRef);
  };

  const handleTouchMove = (e: React.TouchEvent, useFullscreenRef?: boolean) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, useFullscreenRef);
    }
  };

  // Load image dimensions for auto aspect ratio
  useEffect(() => {
    if (aspectRatio === 'auto') {
      const img = document.createElement('img');
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = beforeImage;
    }
  }, [beforeImage, aspectRatio]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const ref = isFullscreen ? fullscreenContainerRef : containerRef;
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, isFullscreen]);

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Restore scroll
    };
  }, [isFullscreen]);

  // Calculate the style for the container
  const getContainerStyle = (): React.CSSProperties => {
    if (aspectRatio === 'auto' && imageDimensions) {
      return {
        aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`,
      };
    } else if (aspectRatio !== 'auto') {
      return {
        aspectRatio: aspectRatio,
      };
    }
    // Fallback while loading
    return {
      minHeight: '400px',
    };
  };

  // Slider content component to avoid duplication
  const SliderContent = ({
    containerRef,
    useFullscreenRef
  }: {
    containerRef: React.RefObject<HTMLDivElement | null>;
    useFullscreenRef?: boolean
  }) => (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg select-none cursor-ew-resize"
      style={useFullscreenRef ? { height: '100%' } : getContainerStyle()}
      onMouseMove={(e) => handleMouseMove(e, useFullscreenRef)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={(e) => handleClick(e, useFullscreenRef)}
      onTouchMove={(e) => handleTouchMove(e, useFullscreenRef)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      role="img"
      aria-label={`Image comparison slider: ${beforeLabel} and ${afterLabel}. ${alt}`}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${alt} - ${afterLabel}`}
          fill
          className="object-contain"
          priority
        />
        {/* After Label */}
        <div
          className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium"
          aria-label={`${afterLabel} image`}
        >
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Overlay with clip) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} - ${beforeLabel}`}
          fill
          className="object-contain"
          priority
        />
        {/* Before Label */}
        <div
          className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium"
          aria-label={`${beforeLabel} image`}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        role="slider"
        aria-label="Comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(sliderPosition)}% ${beforeLabel} visible`}
        tabIndex={0}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-700"></div>
            <div className="w-0.5 h-4 bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="my-8">
        <div className="relative">
          <SliderContent containerRef={containerRef} />

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors"
            aria-label="View image comparison in fullscreen mode"
            title="View in fullscreen"
          >
            <Maximize2 className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-center text-sm text-gray-300 mt-3 mb-2">
            {caption}
          </p>
        )}

        {/* Instructions */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Click or drag the slider to compare the images
        </p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image comparison"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
            aria-label="Close fullscreen view and return to page"
            title="Close fullscreen (ESC)"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Fullscreen Slider Content */}
          <div className="w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
            <SliderContent containerRef={fullscreenContainerRef} useFullscreenRef={true} />

            {/* Caption in fullscreen */}
            {caption && (
              <p className="text-center text-sm text-gray-300 mt-4">
                {caption}
              </p>
            )}

            {/* Instructions in fullscreen */}
            <p className="text-center text-sm text-gray-400 mt-2" role="status" aria-live="polite">
              Click or drag the slider to compare the images • Press ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
