'use client';

import React, { useRef, useState } from 'react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Container do Vídeo com Aspect Ratio 16:9 */}
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {/* Aspect ratio 16:9 = 9/16 = 0.5625 = 56.25% */}
            
            {/* Vídeo */}
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl object-cover"
              controls
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/Loquia-HD1080p.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeos.
            </video>

            {/* Overlay de Play */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity hover:bg-opacity-40 rounded-2xl"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <svg 
                    className="w-10 h-10 md:w-12 md:h-12 text-gray-900 ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
