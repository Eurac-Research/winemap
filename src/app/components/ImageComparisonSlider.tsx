'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Move slider to click position
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
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
        handleMove(e.clientX);
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
  }, [isDragging]);

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

  return (
    <div className="my-8">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg select-none cursor-ew-resize"
        style={getContainerStyle()}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
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
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
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
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Line and Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
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
  );
}
